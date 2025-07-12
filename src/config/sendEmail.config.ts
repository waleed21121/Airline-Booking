import * as nodemailer from 'nodemailer';
import { envVariables } from '.';
import { AppError } from '../utils';
import { StatusCodes } from 'http-status-codes';

const transporter = nodemailer.createTransport({
    service: envVariables.EMAIL_SERVICE,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: envVariables.SENDER_EMAIL,
        pass: envVariables.APP_PASSWORD
    }
});

export function sendVerificationEmail (email: string, token: string) {

    const verificationUrl = `${envVariables.SERVER_URL}/v1/users/verify-email?token=${token}&email=${email}`;

    const mailOptions = {
        from: envVariables.SENDER_EMAIL,
        to: email,
        subject: 'Email Verification',
        html: `
            <h1>Welcome!</h1>
            <p>Please confirm your email address by clicking the link below:</p>
            <a href="${verificationUrl}">Confirm Email</a>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error sending verification email.", error.message)
        } else {
            console.log('Email sent:'+ info.response);
        }
    })
}