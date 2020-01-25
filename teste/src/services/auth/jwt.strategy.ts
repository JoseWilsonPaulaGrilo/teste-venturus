import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

/*
Nunca deve ser exposta publicamente
A chave secreta só está amostra afim de
deixar claro o que o código está fazendo
em um ambinte de produção, a chave deve
estar protegida  por medidas apropriadas
(como por exemplo secret vaults, variaveis
de ambiente ou serviços de configuração)
*/
export const secretKey = 'wingardium leviosa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //tempo de validade do token
            secretOrKey: secretKey,
        });
    }

    async validate(payLoad: any){
        return { userLogin: payLoad.userLogin};
    }
}