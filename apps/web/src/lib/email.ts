import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function sendEmail({
    to,
    subject,
    html,
    text,
}: {
    to: string;
    subject: string;
    html: string;
    text?: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.log('[MOCK] Sending Email:', { to, subject });
        return { success: true, id: 'mock_email_id' };
    }

    try {
        const data = await resend.emails.send({
            from: 'TUTALLER <noreply@tutaller.com>',
            to,
            subject,
            html,
            text,
        });
        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}
