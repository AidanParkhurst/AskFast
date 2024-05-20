import nodemailer from 'nodemailer';
import { MAILTRAP_PASS } from '$env/static/private';

export const EMAIL_FROM = "no-reply@askfa.st";
export const EMAIL_SERVER = "live.smtp.mailtrap.io";

const transport = nodemailer.createTransport({
    host: EMAIL_SERVER,
    port: 587,
    auth: {
        user: "api",
        pass: MAILTRAP_PASS
    }
});

export async function sendVerificationRequest (params) {
    console.log(params);
    const { identifier: email, url } = params;
    const result = await transport.sendMail({
        to: email,
        from: EMAIL_FROM,
        subject: "Sign in to Ask Fast",
        text: `Hello! We just received a request to sign in using your email! Use this link to sign in to your account: ${url}`
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if(failed.length) {
        console.error("Failed to send email");
        return false;
    }
}