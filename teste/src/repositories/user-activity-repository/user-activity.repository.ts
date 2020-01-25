import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserActivity } from "src/domain/schemas/user-activity-schema";
import { Model } from 'mongoose';
import { UserActivityCommentDto } from "src/domain/dto/user-activity-comments.dto";
import { UserActivityDto } from "src/domain/dto/user-activity.dto";
import { User } from "src/domain/schemas/user.schema";

@Injectable()
export class UserActivityRepository {
    constructor(
        @InjectModel('UserActivity') private readonly userActivityCollection: Model<UserActivity>){
    }
    
    async getById(id: string): Promise<UserActivity>{
    return await this.userActivityCollection
    .findOne({ _id: id})
    .lean();
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

    async update(userActivity: UserActivity){
        const updateActivity = await this.userActivityCollection.findOneAndUpdate(
            { _id: userActivity._id },
            userActivity,
            { new: true });

            return await updateActivity.save();
    }
}