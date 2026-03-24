import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../../data-access/entities/user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, 
  ) {}

  // Register user
async create(createUserData: { email: string; password: string }): Promise<UserDocument> {
      
    const existingUser = await this.userModel.findOne({ email: createUserData.email }); // Check for existing user
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserData.password, 10); // Hash password

    const newUser = new this.userModel({
      email: createUserData.email,
      password: hashedPassword,
  });

  return newUser.save();

  }

  // Login
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
      return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Delete user
  async remove(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
