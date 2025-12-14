import {BadGatewayException, BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {LoginDto} from "./dtos/login.dto";
import {SignUpDto} from "./dtos/sign-up.dto";
import {Model} from 'mongoose';
import * as bcrypt from 'bcryptjs';

import {InjectModel} from '@nestjs/mongoose';
import {TUserDoc, User} from '../../db/schemas/user.schema';
import {JwtService} from '@nestjs/jwt';
import {UserOutputDto} from "../user/dtos/user.output.dto";
import {IJwtPayload} from "../../common/interfaces/config/jwt.interface";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<TUserDoc>,
        private jwtService: JwtService,
    ) {
    }

    async login(loginDto: LoginDto) {
        const errorMessage = "Invalid Username or Password"
        const user = await this.userModel.findOne({email: loginDto.email}).exec();
        if (!user) {
            throw new UnauthorizedException(errorMessage)
        }
        const isValidPass = await bcrypt.compare(loginDto.password, user.password);

        if (!isValidPass) {
            throw new UnauthorizedException(errorMessage);
        }

        const jwtPayload: IJwtPayload = {email: user.email, id: user.id};
        return {
            accessToken: this.jwtService.sign(jwtPayload),
            data: new UserOutputDto(user),
        };
    }

    async singUp(signUpDto: SignUpDto) {
        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
        const existingUser = await this.userModel.exists({email: signUpDto.email})
        if (existingUser) {
            throw new BadRequestException('User With Email already Exists')
        }

        const newUser = new this.userModel({
            email: signUpDto.email,
            password: hashedPassword,
            fullName: signUpDto.fullName,
        });
        await newUser.save();
        return {status: 201, message: 'User registered successfully'};
    }
}

