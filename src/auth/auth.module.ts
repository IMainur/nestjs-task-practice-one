import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature(
      [
        UsersRepository
      ]
    ),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // JwtModule.register({
    //   secret: `abcdefghijklmnopqrstuvwxyz`,
    //   signOptions: {
    //     expiresIn: 3600,
    //   }
    // })
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: 3600,
        }
      })
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [
    AuthController
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule { }
