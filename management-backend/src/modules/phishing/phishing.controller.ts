import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {SendPhishingDto} from "./dtos/send-phishing.dto";
import {PhishingOutputDto} from "./dtos/phishing.output.dto";
import {JwtAuthGuard} from "../../common/gaurds/jwt-auth.guard";

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
    constructor(private readonly phishingService: PhishingService) {}

    @Post('send')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async sendEmail(@Body() sendPhishingDto: SendPhishingDto) {
        return this.phishingService.sendPhishingEmail(sendPhishingDto.email);
    }

    @Get('attempts')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async getAllAttempts() {
        const data = await this.phishingService.getAllAttempts();
        return data.map((attempt: any) => new PhishingOutputDto(attempt));
    }
}

