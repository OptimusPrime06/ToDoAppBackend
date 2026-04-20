import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserRepository } from "src/modules/users/business-logic/interfaces/i.users.repositories";
import { SaveUserDto } from "src/modules/authentication/business/repositories.interfaces/save.user.dto";
import { UserDocument, User } from "../entities/user.entity";
import { Model } from "mongoose";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

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

    async deleteUserById(userId: string): Promise<void> {
        await this.userModel.deleteOne({ userId });
    }
    
}