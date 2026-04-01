import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/data-access/entities/user.entity';
import { AuthService } from './business/services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthRepository } from './data.access/repositories/auth.repository';
import { IAuthRepository } from './business/repositories.interfaces/i.auth.repository';
import { HashingService } from './business/services/hashing.service';
import { TokenService } from './business/services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashingService,
    TokenService,
    {
      provide: IAuthRepository,
      useClass: AuthRepository
    },
  ],
})
export class AuthModule {}
