export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { name, email, subject, message } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'oktim.v@gmail.com',
        subject: `Ново съобщение: ${subject}`,
        html: `<p><strong>Име:</strong> ${name}</p><p><strong>Имейл:</strong> ${email}</p><p><strong>Съобщение:</strong><br>${message}</p>`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return res.status(500).json({ error: errorData });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Send error:', error);
    res.status(500).json({ error: error.message });
  }
};
