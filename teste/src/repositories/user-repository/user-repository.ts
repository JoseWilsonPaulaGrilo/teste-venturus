import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/schemas/user.schema';
import { userInfo } from 'os';
import { UserActivity } from 'src/domain/schemas/user-activity-schema';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User') private readonly userActivityCollection: Model<User>) {
    }

    async getByCredentials(userLoginFromViewModel: string, passwordFromViewModel: string){
        return await this.userActivityCollection
        .findOne({
            userLogin: userLoginFromViewModel,
            password: passwordFromViewModel,
        })
        .lean();
    }

    async getById(id: string): Promise<User> {
        return await this.userActivityCollection
        .findOne({ _id: id })
        .lean();
    }

    async getUsers(): Promise<User[]>{
        return await this.userActivityCollection
        .find()
        .lean();
    }
    
    async createUser(newUser: UserViewModel){
        const user = this.userActivityCollection(newUser);
        return await user.save();
    }
}
