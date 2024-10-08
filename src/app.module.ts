import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '1211723310',
    //   database: 'task-management',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService
      ) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        }

      },
    }),
    // TypeOrmModule.forRootAsync({
    //   imports:[ConfigModule],
    //   inject:[ConfigService],
    //   useFactory: async (
    //     configService: ConfigService
    //   ) => {
    //     return{
    //       type: 'postgres',
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     }
    //   },
    // }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
