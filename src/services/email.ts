const VERCEL_API_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_VERCEL_API_URL || 'http://localhost:3000');

export const sendTasksSummaryEmail = async (email: string, tasksSummary: string) => {
  const response = await fetch(`${VERCEL_API_URL}/api/send-tasks-summary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      tasksSummary
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }

  return response.json();
};
