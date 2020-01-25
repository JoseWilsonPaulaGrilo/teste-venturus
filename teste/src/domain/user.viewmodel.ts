import { IsNotEmpty, Length } from 'class-validator';

export class UserViewModel {
    constructor(userLogin: string, userName: string, password: string){
        this.userLogin = userLogin;
        this.userName = userName;
        this.password = password;
    }
    @IsNotEmpty()
    @Length(3, 10)
    //readonly userLogin: string;
    userLogin: string;

    @IsNotEmpty()
    @Length(3, 10)
    //readonly userName: string;
    userName: string;

    @IsNotEmpty()
    @Length(3, 10)
    //readonly userPassword: string;
    password: string;
}