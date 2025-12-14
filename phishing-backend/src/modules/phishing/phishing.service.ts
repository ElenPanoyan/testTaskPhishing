import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Phishing, TPhishingDoc} from "../../db/schemas/phishing.schema";
import {Model} from "mongoose";
import {MailService} from "../mail/mail.service";
import {ConfigService} from "@nestjs/config";
import {getEmailContent} from "../../common/utils/helpers";

@Injectable()
export class PhishingService {
    constructor(
        @InjectModel(Phishing.name)
        private readonly phishingModel: Model<TPhishingDoc>,
        private readonly emailService: MailService,
        private configService: ConfigService
    ) {
    }

    async sendPhishingEmail(email: string) {
        const attemptedEmail = await this.phishingModel.findOne({email}).exec()
        if (attemptedEmail) {
            throw new BadRequestException('Email has been already processed')
        }
        const url = `${this.configService.get('app.url')}/phishing/attempt?email=${email}`;
        const content = getEmailContent(url)
        await this.emailService.sendEmail(email, content)
        const newPhishingAttempt = new this.phishingModel({
            email,
            status: 'pending',
            content,
        });
        await newPhishingAttempt.save()
        return newPhishingAttempt;
    }

    async markAttemptAsClicked(email: string) {
        const attempt = await this.phishingModel.findOne({
            email: email,
            status: 'pending',
        });
        if (!attempt) {
            throw new BadRequestException('Phishing attempt  not found');
        }
        attempt.status = 'clicked';
        await attempt.save();
        return attempt;
    }

    async getAllAttempts(): Promise<Phishing[]> {
        return this.phishingModel.find();
    }
}

