import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TUserDoc, User } from '../../db/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<TUserDoc>,
    ) {}

    async getUserWithEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
}

