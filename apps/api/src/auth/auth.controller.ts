import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginInDto } from './dto/auth-login-in-dto';
import { ApiResponseEntity } from '@app/common/decorator/api-response-entity.decorator';
import { ResponseEntity } from '@app/common/network/response-entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponseEntity({ summary: 'login' })
  signIn(@Body() authLoginInDto: AuthLoginInDto) {
    return new ResponseEntity()
      .ok()
      .body(this.authService.signIn(authLoginInDto))
      .build();
  }
}
