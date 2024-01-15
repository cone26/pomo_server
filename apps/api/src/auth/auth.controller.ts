import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('login')
  // @ApiResponseEntity({ summary: 'login' })
  // signIn(@Body() authLoginInDto: AuthLoginInDto) {
  //   return new ResponseEntity()
  //     .ok()
  //     .body(this.authService.signIn(authLoginInDto))
  //     .build();
  // }
}
