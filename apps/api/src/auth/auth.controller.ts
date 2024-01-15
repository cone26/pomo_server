import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { AuthLoginInDto } from './dto/auth-login-in-dto';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiResponseEntity({ summary: 'login' })
  async signIn(@Body() authLoginInDto: AuthLoginInDto) {
    return new ResponseEntity()
      .ok()
      .body(await this.userService.signIn(authLoginInDto));
  }
}
