import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {User} from '../../db/schemas/user.schema';
import {UserService} from "./user.service";
import {UserOutputDto} from "./dtos/user.output.dto";
import {JwtAuthGuard} from "../../common/gaurds/jwt-auth.guard";
import {CurrentUser} from "../../common/decorators/current-user.decorator";

@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@CurrentUser() user: User) {
        const data = await this.userService.getUserWithEmail(user.email);
        return new UserOutputDto(data);
    }
}

