import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Phishing, PhishingStatus, TPhishingDoc } from '../../db/schemas/phishing.schema';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getEmailContent } from '../../common/utils/helpers';

@Injectable()
export class PhishingService {
    constructor(
        @InjectModel(Phishing.name)
        private readonly phishingModel: Model<TPhishingDoc>,
        private readonly emailService: MailService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async sendPhishingEmail(email: string) {
        const existingAttempt = await this.phishingModel.findOne({ email }).exec();
        if (existingAttempt) {
            throw new BadRequestException('Email has been already processed');
        }

        const token = this.jwtService.sign({ email });
        const url = `${this.configService.get('app.url')}/phishing/attempt?token=${token}`;
        const content = getEmailContent(url);

        await this.emailService.sendEmail(email, content);

        const newPhishingAttempt = new this.phishingModel({
            email,
            status: PhishingStatus.PENDING,
            content,
        });
        await newPhishingAttempt.save();

        return newPhishingAttempt;
    }

    async markAttemptAsClicked(email: string) {
        const attempt = await this.phishingModel.findOne({
            email,
            status: PhishingStatus.PENDING,
        });

        if (!attempt) {
            throw new BadRequestException('Phishing attempt not found');
        }

        attempt.status = PhishingStatus.CLICKED;
        await attempt.save();

        return attempt;
    }

    async getAllAttempts(): Promise<Phishing[]> {
        return this.phishingModel.find();
    }
}
