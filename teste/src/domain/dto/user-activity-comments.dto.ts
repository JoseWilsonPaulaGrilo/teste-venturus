export class UserActivityCommentDto{

constructor(userId: string, userName: string, comment: string){
    this.userId = userId;
    this.userName = userName;
    this.comment = comment;
    this.timestamp = new Date();
}

    private readonly userId: string;
    private readonly userName: string;
    private readonly comment: string;
    private readonly timestamp: Date;
}