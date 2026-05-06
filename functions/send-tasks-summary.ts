import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { email, tasksSummary } = await request.json();

    if (!email || !tasksSummary) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
