import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';

@Injectable()
export class WriterOrAddminMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    console.log(req.user.role);
    if (req.user || req.user.role == 'admin' || req.user.role == 'writer') {
      next();
      return;
    } else {
      throw new ForbiddenException(
        'Access denied. Only writers and admins are allowed.',
      );
    }
  }
}
