import {Injectable, Logger} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import {ConfigService} from "@nestjs/config";
@Injectable()
export class MailService {
    logger = new Logger(MailService.name)
    private transporter: Transporter;
    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: configService.get<string>('app.mailUser'),
                pass: configService.get<string>('app.mailPassKey'),
            },
        });
    }



    async sendEmail(to: string, emailContent: string){
        try {
            await this.transporter.sendMail({
                from: 'Hacker',
                to,
                subject: 'Testing',
                html: emailContent,
            });

            this.logger.log(`Email sent successfully to ${to}`);
        } catch (error) {
            this.logger.error(`Error sending email: ${error.message}`);
            throw new Error('Failed to send email');
        }
    }

}

