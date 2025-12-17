import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtPhishingGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.query.token;

        if (!token) {
            throw new BadRequestException('Token is required');
        }

        try {
            const payload = this.jwtService.verify(token);
            request.phishingPayload = payload;
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new BadRequestException('Phishing attempt has expired');
            }
            throw new BadRequestException('Invalid token');
        }
    }
}
