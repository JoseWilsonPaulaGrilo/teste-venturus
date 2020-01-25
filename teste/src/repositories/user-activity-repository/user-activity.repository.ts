import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserActivity } from "src/domain/schemas/user-activity-schema";
import { Model } from 'mongoose';
import { UserActivityCommentDto } from "src/domain/dto/user-activity-comments.dto";
import { UserActivityDto } from "src/domain/dto/user-activity.dto";

@Injectable()
export class UserActivityRepository {
    constructor(
        @InjectModel('UserActivity') private readonly userActivityCollection: Model<UserActivity>){

    }

    async getPaged(index: number) {
        return await this.userActivityCollection
        .find()
        .sort({ timestamp: -1 })
        .skip(index)
        .limit(10)
        .lean();
    }

    async create(UserActivityDto: UserActivityDto){
        const newUserActivity = this.userActivityCollection(UserActivityDto);
        return await newUserActivity.save();
    }
}