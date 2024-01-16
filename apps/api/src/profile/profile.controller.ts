import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CurrentUser } from '@libs/common/decorator/current-user.decorator';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { UserDto } from '@libs/dao/common/user/user.dto';

@ApiTags('profile')
@Controller('profile')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/')
  async getProfileByUser(
    @CurrentUser() user,
  ): Promise<ResponseEntity<UserDto>> {
    const profileDto = await this.profileService.getProfileByUser(user.email);

    return new ResponseEntity<UserDto>().ok().body(profileDto);
  }
}
