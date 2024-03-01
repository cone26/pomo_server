// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { FastifyRequest } from 'fastify';
// import { isUndefined } from '@nestjs/common/utils/shared.utils';
// import { JwtService } from '@nestjs/jwt';
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     private readonly jwtService: JwtService,
//   ) {}
//   public async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     const active = await this.setHttpHeader(
//       context.switchToHttp().getRequest<FastifyRequest>(),
//       isPublic,
//     );
//     if (!activate) {
//       throw new UnauthorizedException();
//     }
//
//     return activate;
//   }
//
//   private async setHttpHeader(
//     req: FastifyRequest,
//     isPublic: boolean,
//   ): Promise<boolean> {
//     const auth = req.headers?.authorization;
//
//     if (isUndefined(auth) || isNull(auth) || auth.length === 0) {
//       return isPublic;
//     }
//
//     const authArr = auth.split(' ');
//     const bearer = authArr[0];
//     const token = authArr[1];
//     if (isUndefined(bearer) || isNull(bearer) || bearer !== 'Bearer') {
//       return isPublic;
//     }
//     if (isUndefined(token) || isNull(token) || !isJWT(token)) {
//       return isPublic;
//     }
//     try {
//       const { id } = await this.jwtService.verifyToken(
//         token,
//         TokenTypeEnum.ACCESS,
//       );
//       req.user = id;
//       return true;
//     } catch (_) {
//       return isPublic;
//     }
//   }
// }
