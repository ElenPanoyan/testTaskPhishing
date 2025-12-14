import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import { ApiTags } from '@nestjs/swagger';
import {LoginDto} from "./dtos/login.dto";
import {SignUpDto} from "./dtos/sign-up.dto";


@ApiTags('Auth')
@Controller('auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    async signUp(@Body() singUpDto: SignUpDto){
        return this.authService.singUp(singUpDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }
}

