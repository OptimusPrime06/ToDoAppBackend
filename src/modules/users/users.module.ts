import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './data-access/entities/user.entity';
import { UsersController } from './presentation/controllers/users.controller';
import { IUserRepository } from './business-logic/interfaces/i.users.repositories';
import { UserRepository } from './data-access/repositories/user.repository';
import { UsersService } from './business-logic/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        JwtService,
        {
            provide: IUserRepository,
            useClass: UserRepository
        }
    ]
})
export class UsersModule { }
