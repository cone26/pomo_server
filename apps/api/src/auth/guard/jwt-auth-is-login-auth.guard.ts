import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthIsLoginAuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['authorization'] ?? req.query.authorization;
    if (key) {
      const guard = new JwtAuthGuard();
      return guard.canActivate(context);
    }
    return true;
  }
}
