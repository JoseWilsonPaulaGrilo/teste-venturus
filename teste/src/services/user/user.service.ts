import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    retornarUsuarios() {
        throw new Error("Method not implemented.");
        return ['João', 'Danilo', 'X'];
    }
}
