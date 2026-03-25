import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/authentication/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/users', {
      autoIndex: true,           
      serverSelectionTimeoutMS: 5000,
    }),
    AuthModule,
    //User module to update password if forgotten
    //Notes module
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
