import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../data-access/repositories/user.repository";
import { IUserRepository } from "../interfaces/i.users.repositories";

@Injectable()
export class UsersService {
    constructor(
        @Inject(IUserRepository) private readonly userRepository: UserRepository,
    ) { }
    async deleteUserById(userId: string): Promise<boolean> {
        let userExist: boolean = await this.userRepository.userExist(userId);
        if (userExist === false) {
            return false
        }
        await this.userRepository.deleteUserById(userId);
        // Add delete notes
        return true
    }
}