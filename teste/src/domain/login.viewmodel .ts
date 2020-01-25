import { IsNotEmpty, Length } from 'class-validator';

export class LoginViewModel {
    @IsNotEmpty()
    @Length(3, 10)
    readonly userLogin: string;

    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string;
}