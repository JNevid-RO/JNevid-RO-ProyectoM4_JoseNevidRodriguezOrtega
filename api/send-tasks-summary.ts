import { VercelRequest, VercelResponse } from '@vercel/node';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, tasksSummary } = request.body;

    // Validate input
    if (!email || !tasksSummary) {
      return response.status(400).json({ error: 'Missing required fields: email and tasksSummary' });
    }

    // Validate AWS credentials are available
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.SES_FROM_ADDRESS) {
      return response.status(500).json({ error: 'AWS SES credentials not configured' });
    }

    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_ADDRESS,
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: 'Resumen de tus tareas - MateCode Task Manager'
        },
        Body: {
          Text: {
            Data: `Hola,

Aquí tienes un resumen de tus tareas actuales:

${tasksSummary}

¡Sigue organizando tu día!

MateCode Task Manager`
          },
          Html: {
            Data: `
              <h1>MateCode Task Manager</h1>
              <p>Hola,</p>
              <p>Aquí tienes un resumen de tus tareas actuales:</p>
              <pre>${tasksSummary}</pre>
              <p>¡Sigue organizando tu día!</p>
              <p><em>MateCode Task Manager</em></p>
            `
          }
        }
      }
    });

    await sesClient.send(command);

    return response.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ error: 'Failed to send email', details: String(error) });
  }
}

