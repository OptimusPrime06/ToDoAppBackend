import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { RegisterRequestDto } from '../../presentation/dtos/register.request.dto';
import { RegisterResponeDto } from '../../presentation/dtos/register.response.dto';
import { IAuthRepository } from '../repositories.interfaces/i.auth.repository';
import { HashingService } from './hashing.service';
import { SaveUserDto } from '../repositories.interfaces/save.user.dto';
import { TokenService } from './token.service';
import { LoginRequestDto } from '../../presentation/dtos/login.request.dto';
import { LoginResponeDto } from '../../presentation/dtos/login.response.dto';

@Injectable()
export class AuthService {

  constructor( 
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository,
    @Inject() private readonly hashingService: HashingService,
    @Inject() private readonly tokensServices: TokenService,
  ){}

  // Check if User exist
  async userExist(email: string): Promise<boolean> {
    const emailInUse = await this.authRepository.checkExistingUser(email); 
    return emailInUse
  }

  // Register user
async registerUser(requestRegisterDto: RegisterRequestDto): Promise<RegisterResponeDto> {  

    let hashedPassword: string = await this.hashingService.hashPassword(requestRegisterDto.password);

    let newSavedUser: SaveUserDto = await this.authRepository.saveUser(requestRegisterDto.email, hashedPassword);

    let newUserResponseDto: RegisterResponeDto = {
      id: newSavedUser.id,
      email: newSavedUser.email,
    }

  return newUserResponseDto;
}

  // Login
  async loginUser(loginRequestDto: LoginRequestDto): Promise<LoginResponeDto | null> {
    // Validate password
    let passwordMatch: boolean = await this.hashingService.validatePassword(loginRequestDto.email, loginRequestDto.password)
    if (passwordMatch === false) {
      return null
    }
    
    let userId: string | null = await this.authRepository.getUserId(loginRequestDto.email);
    if (userId === null) {
      return null
    }

    // Generate access and refresh tokens
    let payload = {
      email: loginRequestDto.email,
      id: userId
    }
    let accessToken: string = await this.tokensServices.generateAccessToken(payload);
    let refreshToken: string = await this.tokensServices.generateRefreshToken(payload);

    return {
      email: loginRequestDto.email,
      id: userId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

}
