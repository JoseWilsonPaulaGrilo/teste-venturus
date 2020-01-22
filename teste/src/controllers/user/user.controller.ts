import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){

    }

    @Get()
    retornaUsuarios() {
        //return ['João', 'Danilo', 'X'];
        return this.userService.retornarUsuarios();
    }

    @Post()
    criarUsuarios(@Body() newUser: UserViewModel){
        //Usuário criado com sucesso.
        return newUser;
    }
}
