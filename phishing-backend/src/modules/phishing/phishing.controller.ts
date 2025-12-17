import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { ApiTags } from '@nestjs/swagger';
import { SendPhishingDto } from './dtos/send-phishing.dto';
import { JwtPhishingGuard } from './guards/jwt-phishing.guard';

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
    constructor(private readonly phishingService: PhishingService) {}

    @Post('send')
    async sendEmail(@Body() sendPhishingDto: SendPhishingDto) {
        return this.phishingService.sendPhishingEmail(sendPhishingDto.email);
    }

    @Get('attempt')
    @UseGuards(JwtPhishingGuard)
    async markClick(@Req() req: { phishingPayload: { email: string } }) {
        return this.phishingService.markAttemptAsClicked(req.phishingPayload.email);
    }

    @Get('attempts')
    async getAllAttempts() {
        return this.phishingService.getAllAttempts();
    }
}
