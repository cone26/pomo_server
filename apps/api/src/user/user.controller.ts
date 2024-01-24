import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { UserDto } from '@libs/dao/common/user/user.dto';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @Get('test')
  // @ApiResponseEntity({ summary: 'test' })
  // async test(): Promise<ResponseEntity<UserDto>> {
  //   return new ResponseEntity<UserDto>()
  //     .ok()
  //     .body(await this.userService.findUser(1));
  // }

  // @Post('/drop')
  // @ApiResponseEntity({summary:'탈퇴'})
  // @ApiBearerAuth('jwt')
  // @UseGuards(JwtAuthGuard)
  // async drop(@CurrentUser() user): Promise<Response> {}
}
