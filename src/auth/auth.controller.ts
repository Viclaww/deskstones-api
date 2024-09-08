import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthDto, CreateUserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('register')
  async getReg() {
    return 'getting';
  }

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    try {
      const email = data.email;

      const userExist = await this.userService.findByEmail(email);

      if (userExist) {
        return {
          message: 'User already exists',
          status: HttpStatus.BAD_GATEWAY,
        };
      }
      const hashedPassword = await this.authService.hashPassword(data.password);

      const newUser = await this.userService.createUser({
        ...data,
        password: hashedPassword,
      });

      const token = await this.authService.getTokens(
        newUser._id,
        newUser.email,
      );

      return {
        status: HttpStatus.CREATED,
        token,
        data: {
          user: {
            email: newUser.email,
            id: newUser._id,
            username: newUser.username,
          },
        },
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() data: AuthDto) {
    try {
      const email = data.email;

      const userExist = await this.userService.findByEmail(email);

      if (!userExist) {
        return {
          message: 'No User Found',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const isPasswordCorrect = await this.authService.verifyPassword(
        userExist.password,
        data.password,
      );
      if (!isPasswordCorrect) {
        return {
          message: 'Wrong Email or Password',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const token = await this.authService.getTokens(
        userExist._id,
        userExist.email,
      );
      return {
        message: 'User login successfully',
        token,
        data: {
          user: {
            email: userExist.email,
            id: userExist._id,
          },
        },
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
