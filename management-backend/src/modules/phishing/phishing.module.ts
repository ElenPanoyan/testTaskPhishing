import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [PhishingController],
    providers: [PhishingService],
})
export class PhishingModule {}

