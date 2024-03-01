import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleAuthGuard } from './guard/google-auth.guard';
// import { FastifyThrottlerGuard } from './guard/fastify-throttler.guard';

@ApiTags('auth')
@Controller('auth')
// @UseGuards(FastifyThrottlerGuard)
@UseGuards(GoogleAuthGuard)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('google/login')
  async googleAuth(@Req() req) {
    console.log('GET google/login - googleAuth 실행');
  }

  @Get('callback/google')
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log('GET callback/google - googleAuthRedirect 실행');

    const { user } = req;
    return res.send(user);
  }

  // @Post('/signup')
  // @ApiResponseEntity({
  //   type: AuthSignupOutDto,
  //   summary: 'signup',
  // })
  // async signup(
  //   @Body() authSignupInDto: AuthSignupInDto,
  // ): Promise<ResponseEntity<AuthSignupOutDto>> {
  //   //TODO: rollback 어케 함
  //
  //   // create a user
  //   const userDto = await this.userService.signup(authSignupInDto);
  //
  //   // create a JWT
  //   const payload: JwtPayload = {
  //     id: userDto.id,
  //     email: userDto.email,
  //     nickname: userDto.nickName,
  //   };
  //   const accessToken = this.authService.getAccessToken(payload);
  //
  //   return new ResponseEntity<AuthSignupOutDto>()
  //     .ok()
  //     .body(AuthSignupOutDto.of().setAccessToken(accessToken));
  // }
  // @Post('/login')
  // @ApiResponseEntity({ type: AuthLoginOutDto, summary: 'login' })
  // async signIn(
  //   @Body() authLoginInDto: AuthLoginInDto,
  // ): Promise<ResponseEntity<AuthLoginOutDto>> {
  //   // login
  //   const userDto = await this.userService.signIn(authLoginInDto);
  //
  //   const payload: JwtPayload = {
  //     id: userDto.id,
  //     email: userDto.email,
  //     nickname: userDto.nickName,
  //   };
  //
  //   const accessToken = this.authService.getAccessToken(payload);
  //
  //   return new ResponseEntity<AuthLoginOutDto>()
  //     .ok()
  //     .body(AuthLoginOutDto.of().setAccessToken(accessToken));
  // }
}
