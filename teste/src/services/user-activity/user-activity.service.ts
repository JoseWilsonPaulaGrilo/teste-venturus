import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comments.dto';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { userInfo } from 'os';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-activity.repository';

@Injectable()
export class UserActivityService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository){
    }
    async uploadImage(userId: string, filename: string, description: string){
        const user = await this.userRepository.getById(userId);
        if(!user){
            throw new BadRequestException('This user dos not exist');
        }

        const uploadImageObj = new UserActivityDto(userId, filename, user.userName);
        if(description){
            uploadImageObj.comments.push(new UserActivityCommentDto(
                userId,
                user.userName,
                description,
            ));
        }

        return await this.userActivityRepository.create(uploadImageObj);
    }
}
