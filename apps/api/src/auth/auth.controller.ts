import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { AuthLoginInDto } from './dto/auth-login-in-dto';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { UserService } from '../user/user.service';
import { AuthLoginOutDto } from './dto/auth-login-out.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiResponseEntity({ summary: 'login' })
  async signIn(
    @Body() authLoginInDto: AuthLoginInDto,
  ): Promise<ResponseEntity<AuthLoginOutDto>> {
    // login
    const userDto = await this.userService.signIn(authLoginInDto);

    const payload = {
      id: userDto.id,
      email: userDto.email,
    };
    const accessToken = this.authService.getAccessToken(payload);
    return new ResponseEntity()
      .ok()
      .body(AuthLoginOutDto.of().setAccessToken(accessToken));
  }
}
