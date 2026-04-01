import { 
  Controller,
  Post, 
  Body, 
  Headers, 
  BadRequestException, 
  HttpCode, 
  HttpStatus, 
  ConflictException, 
  UnauthorizedException, 
  UseGuards 
} from '@nestjs/common';
import { AuthService } from '../../business/services/auth.service';
import { RegisterRequestDto } from '../dtos/register.request.dto';
import { RegisterResponeDto } from '../dtos/register.response.dto';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { LoginResponeDto } from '../dtos/login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register user
  @Post('register')
  async register(@Body() registerRequestDto: RegisterRequestDto): Promise<RegisterResponeDto> {
    let userExist: boolean = await this.authService.userExist(registerRequestDto.email);

    if (userExist) {
      throw new ConflictException('User with this email already exists');
    }

    let response: RegisterResponeDto = await this.authService.registerUser(registerRequestDto);
    
    return response
  }

  // Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponeDto> {

    let response: LoginResponeDto | null = await this.authService.loginUser(loginRequestDto)
    if(response === null) throw new UnauthorizedException();

    return response;
  }

}
