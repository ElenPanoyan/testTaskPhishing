import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { ApiTags } from '@nestjs/swagger';
import {SendPhishingDto} from "./dtos/send-phishing.dto";

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
    constructor(private readonly phishingService: PhishingService) {}

    @Post('send')
    async sendEmail(@Body() sendPhishingDto: SendPhishingDto) {
        return this.phishingService.sendPhishingEmail(sendPhishingDto.email);
    }

    @Get('attempt')
    async markClick(@Query('email') email: string) {
        return this.phishingService.markAttemptAsClicked(email);
    }

    @Get('attempts')
    async getAllAttempts() {
        return this.phishingService.getAllAttempts();
    }
}

