import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from '../../../users/data-access/entities/user.entity'
import { Model } from 'mongoose';
import { IAuthRepository } from "../../business/repositories.interfaces/i.auth.repository";
import { SaveUserDto } from "../../business/repositories.interfaces/save.user.dto";

@Injectable()
export class AuthRepository implements IAuthRepository {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async checkExistingUser(email: string): Promise<boolean> {
        let user = await this.userModel.exists({ email });
        return (user !== null);
    }

    async getPassword(email: string): Promise<string | null> {
        let user = await this.userModel.findOne({ email });
        return user?.password ?? null;
    }

    async getUserId(email: string): Promise<string | null> {
        let user = await this.userModel.findOne({email});
        return user?._id ?? null
    }

    async saveUser(newEmail: string, hashedPassword: string): Promise<SaveUserDto> {
        let newUser = new this.userModel({email: newEmail, password: hashedPassword});
        await newUser.save();
        console.log(newUser);
        return {
            id: newUser._id,
            email: newUser.email,
            hashedPassword: newUser.password
        }
    }
}