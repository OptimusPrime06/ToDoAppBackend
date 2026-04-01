import { SaveUserDto } from "./save.user.dto";

export abstract class IAuthRepository {
    abstract checkExistingUser(email: string): Promise<boolean>;
    abstract getPassword(email: string): Promise<string | null>;
    abstract getUserId(email: string): Promise<string | null>;
    abstract saveUser(newEmail: string, hashedPassword: string): Promise<SaveUserDto>;
} 