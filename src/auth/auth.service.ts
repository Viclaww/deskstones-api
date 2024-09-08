import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async hashPassword(password: string) {
    return await hash(password);
  }
  async verifyPassword(userPassword: string, inputedPassword: string) {
    return await verify(userPassword, inputedPassword);
  }
  async getTokens(userId, email: string) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
    ]);

    return accessToken;
  }
}
