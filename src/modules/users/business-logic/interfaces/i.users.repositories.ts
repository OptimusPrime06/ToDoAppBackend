import { SaveUserDto } from "src/modules/authentication/business/repositories.interfaces/save.user.dto";

export abstract class IUserRepository {
    abstract checkExistingUser(email: string): Promise<boolean>;
    abstract getPassword(email: string): Promise<string | null>;
    abstract getUserId(email: string): Promise<string | null>;
    abstract saveUser(newEmail: string, hashedPassword: string): Promise<SaveUserDto>;
    abstract deleteUserById(userId: string): Promise<void>;
}