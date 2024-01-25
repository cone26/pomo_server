import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { AuthLoginInDto } from './dto/auth-login-in.dto';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { UserService } from '../user/user.service';
import { AuthLoginOutDto } from './dto/auth-login-out.dto';
import { AuthSignupOutDto } from './dto/auth-signup-out.dto';
import { AuthSignupInDto } from './dto/auth-signup-in.dto';
import { JwtPayload } from './payload/jwt.payload';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  @ApiResponseEntity({
    type: AuthSignupOutDto,
    summary: 'signup',
  })
  async signup(
    @Body() authSignupInDto: AuthSignupInDto,
  ): Promise<ResponseEntity<AuthSignupOutDto>> {
    // create a user
    const userDto = await this.userService.signup(authSignupInDto);

    // create a JWT
    const payload: JwtPayload = {
      id: userDto.id,
      email: userDto.email,
      nickname: userDto.nickName,
    };
    const accessToken = this.authService.getAccessToken(payload);

    return new ResponseEntity<AuthSignupOutDto>()
      .ok()
      .body(AuthSignupOutDto.of().setAccessToken(accessToken));
  }
  @Post('/login')
  @ApiResponseEntity({ type: AuthLoginOutDto, summary: 'login' })
  async signIn(
    @Body() authLoginInDto: AuthLoginInDto,
  ): Promise<ResponseEntity<AuthLoginOutDto>> {
    // login
    const userDto = await this.userService.signIn(authLoginInDto);

    const payload: JwtPayload = {
      id: userDto.id,
      email: userDto.email,
      nickname: userDto.nickName,
    };

    const accessToken = this.authService.getAccessToken(payload);

    return new ResponseEntity<AuthLoginOutDto>()
      .ok()
      .body(AuthLoginOutDto.of().setAccessToken(accessToken));
  }
}
