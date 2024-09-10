import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    if (!req.user || req.user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Only admins are allowed.');
    }
    next();
  }
}
