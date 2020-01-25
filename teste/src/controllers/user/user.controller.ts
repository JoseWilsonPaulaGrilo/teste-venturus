import { Controller, Get, Post, Body, UseGuards, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){
    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    retornaUsuarios() {
        return this.userService.getUsers();
    }
    @Post()
    criarUsuarios(@Body() newUser: UserViewModel){
        //Usuário criado com sucesso.
        return this.userService.createNewUser(newUser);
    }
    @Put()
    atualizarUsuarios(@Body() user: UserViewModel){
        //Usuário atualizado com sucesso.
        return this.userService.updateUser(user);
    }
}
