import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';

@Injectable()
export class WriterMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    if (!req.user || req.user.role !== 'writer' || req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Access denied. Only writers and admins are allowed.',
      );
    }
    next();
  }
}
