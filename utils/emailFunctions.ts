'use server';

// Note: Using nodemailer requires Node.js runtime, 'use server' directive required for Next.js compatibility!

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'mirateam.official@gmail.com',
        pass: 'mirateam@2025.10jan'
    }
});

interface EmailOptions {
    to: string;
    subject: string;
    body: string;
    recipientName: string;
}

export const sendEmail = async ({ to, subject, body, recipientName }: EmailOptions): Promise<boolean> => {
    try {
        const html = await generateHTML(recipientName, body);
        const mailOptions = {
            from: 'mirateam.official@gmail.com',
            to,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export const generateHTML = async (to: string, body: string): Promise<string> => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mira Team</title>
        </head>
        <body style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        ">
            <div style="
                background-color: #f8f9fa;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">
                <div style="
                    text-align: center;
                    margin-bottom: 30px;
                ">
                    <h1 style="
                        color: #2c3e50;
                        margin: 0;
                        font-size: 24px;
                    ">Mira Team</h1>
                </div>

                <p style="
                    font-size: 16px;
                    margin-bottom: 20px;
                ">Dear ${to},</p>

                <div style="
                    font-size: 16px;
                    margin-bottom: 30px;
                ">${body}</div>

                <div style="
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                ">
                    <p>Best regards,<br>Mira Team</p>
                </div>
            </div>
        </body>
        </html>
    `;
};