import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PhishingService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}

    async sendPhishingEmail(email: string) {
        try {
            const phishingServerUrl = this.configService.get('app.phishingServerUrl');
            const response = await firstValueFrom(
                this.httpService.post(`${phishingServerUrl}/phishing/send`, { email })
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new HttpException(
                    error.response.data?.message || 'Failed to send phishing email',
                    error.response.status || HttpStatus.BAD_GATEWAY
                );
            }
            throw new HttpException(
                'Failed to communicate with phishing server',
                HttpStatus.BAD_GATEWAY
            );
        }
    }

    async getAllAttempts() {
        try {
            const phishingServerUrl = this.configService.get('app.phishingServerUrl');
            const response = await firstValueFrom(
                this.httpService.get(`${phishingServerUrl}/phishing/attempts`)
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new HttpException(
                    error.response.data?.message || 'Failed to retrieve phishing attempts',
                    error.response.status || HttpStatus.BAD_GATEWAY
                );
            }
            throw new HttpException(
                'Failed to communicate with phishing server',
                HttpStatus.BAD_GATEWAY
            );
        }
    }
}
