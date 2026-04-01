import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IAuthRepository } from '../repositories.interfaces/i.auth.repository';

@Injectable()
export class HashingService {
    constructor(@Inject(IAuthRepository) private readonly authRepository: IAuthRepository){}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async validatePassword(requestEmail: string, requestPassword: string): Promise<boolean> {
        let userPassword: string | null = await this.authRepository.getPassword(requestEmail);
        if (userPassword === null) {
            return false
        }
        return bcrypt.compare(requestPassword, userPassword);
    }

}