import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');
  const { name, email, subject, message } = req.body;
  try {
    await resend.emails.send({
      from: 'Твоето Име <onboarding@resend.dev>',
      to: 'oktim.v@gmail.com',
      subject: `Ново съобщение: ${subject}`,
      html: `<p><strong>Име:</strong> ${name}</p><p><strong>Имейл:</strong> ${email}</p><p><strong>Съобщение:</strong><br>${message}</p>`
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
