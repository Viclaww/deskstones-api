import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    try {
      // Replace 'secretKey' with your actual secret key
      const decoded = jwt.verify(
        token,
        this.configService.get<string>('Jwt.secret'),
      );

      const user = await this.userService.findByEmail(
        (decoded as jwt.JwtPayload).email as string,
      );

      console.log(user);

      req.user = user; // Attach the user data to the request
      next();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
