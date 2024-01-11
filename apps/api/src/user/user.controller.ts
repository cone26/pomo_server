import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { ApiResponseEntity } from '@app/common/decorator/api-response-entity.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from '@app/common/decorator/current-user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @Post('/drop')
  // @ApiResponseEntity({summary:'탈퇴'})
  // @ApiBearerAuth('jwt')
  // @UseGuards(JwtAuthGuard)
  // async drop(@CurrentUser() user): Promise<Response> {}
}
