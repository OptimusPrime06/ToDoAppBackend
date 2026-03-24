import { Controller, Post, Body, Delete, Param, BadRequestException, HttpCode } from '@nestjs/common';
import { UsersService } from '../../business/services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    
    // Return user without password
    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      message: 'User registered successfully',
    };
  }

  // Login user
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    // Validate password
    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    // Return user data (without password)
    return {
      id: user._id,
      email: user.email,
      message: 'Login successful',
    };
  }

  // Delete user
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const deletedUser = await this.usersService.remove(id);
    
    if (!deletedUser) {
      throw new BadRequestException('User not found');
    }

    return {
      message: 'User deleted successfully',
      id: deletedUser._id,
    };
  }
}
