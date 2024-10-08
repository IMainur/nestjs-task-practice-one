import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private configService:ConfigService,
        @InjectRepository(UsersRepository)
        private usersRepository:UsersRepository,
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username } = payload;

        const user:User = await this.usersRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}