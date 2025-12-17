import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Phishing, PhishingSchema } from '../../db/schemas/phishing.schema';
import { JwtPhishingGuard } from './guards/jwt-phishing.guard';

@Module({
    imports: [
        MailModule,
        MongooseModule.forFeature([
            { name: Phishing.name, schema: PhishingSchema },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('app.secret'),
                signOptions: { expiresIn: '1m' },
            }),
        }),
    ],
    controllers: [PhishingController],
    providers: [PhishingService, JwtPhishingGuard],
    exports: [PhishingService],
})
export class PhishingModule {}
