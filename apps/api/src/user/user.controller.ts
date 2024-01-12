// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { AuthService } from '../auth/auth.service';
// import { UserService } from './user.service';
// import { ApiResponseEntity } from '@app/common/decorator/api-response-entity.decorator';
// import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
// import { CurrentUser } from '@app/common/decorator/current-user.decorator';
// import { ResponseEntity } from '@app/common/network/response-entity';
// import { UserDto } from '@app/dao/common/user/user.dto';
//
// @ApiTags('user')
// @Controller('user')
// export class UserController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//   ) {}
//
//   @Get('test')
//   @ApiResponseEntity({ summary: 'test' })
//   async test(): Promise<ResponseEntity<UserDto>> {
//     return new ResponseEntity<UserDto>()
//       .ok()
//       .body(await this.userService.findUser(1));
//   }
//
//   // @Post('/drop')
//   // @ApiResponseEntity({summary:'탈퇴'})
//   // @ApiBearerAuth('jwt')
//   // @UseGuards(JwtAuthGuard)
//   // async drop(@CurrentUser() user): Promise<Response> {}
// }
