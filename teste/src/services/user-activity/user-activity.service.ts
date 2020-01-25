import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comments.dto';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { userInfo } from 'os';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-activity.repository';
import { UserActivity, UserActivitySchema } from 'src/domain/schemas/user-activity-schema';
import { readFileSync } from 'fs';
import { LikeOrDislikeViewModel } from 'src/domain/schemas/like-or-dislike.viewmodel';

@Injectable()
export class UserActivityService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository){
    }

    async getRecentUplads(index: string){
        const indexAsNumber = parseInt(index, 10);
        if(isNaN(indexAsNumber)){
            throw new BadRequestException('Invalid index');
        }

        const recentUplads = await this.userActivityRepository.getPaged(indexAsNumber);
        
        return this.convertImagesToBase64(recentUplads);
    }

    async likeOrDislikeUserActivity(likeOrDislikeUserModel: LikeOrDislikeViewModel){
        const userActivity = await this.userActivityRepository.getById(likeOrDislikeUserModel.userActivityId);
        if(!userActivity){
            throw new BadRequestException('An user Activity with the given id does not exis');
        }

        const user = await this.userRepository.getById(likeOrDislikeUserModel.userId);
        if(!user){
            throw new BadRequestException('An user with the given id does not exist');
        }

        if(userActivity.likes.includes(user._id.toString())){
            userActivity.likes = userActivity.likes.filter(x => x !== user._id.toString());
        }else{
            userActivity.likes.push(user._id.toString());
        }

        return await this.userActivityRepository.update(userActivity);
    }

    async uploadImage(userId: string, fileName: string, description: string){
        const user = await this.userRepository.getById(userId);
        if(!user){
            throw new BadRequestException('This user dos not exist');
        }

        const uploadImageObj = new UserActivityDto(userId, fileName, user.userName);
        if(description){
            uploadImageObj.comments.push(new UserActivityCommentDto(
                userId,
                user.userName,
                description,
            ));
        }

        return await this.userActivityRepository.create(uploadImageObj);
    }
    convertImagesToBase64(userActivities: UserActivity[]){
        return Promise.all(
            userActivities.map(userActivity => {
                return {
                    ...userActivity,
                    imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
                };
            }),
        );
    }
}
