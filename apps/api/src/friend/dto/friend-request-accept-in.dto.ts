import { FriendRequestInDto } from './friend-request-in.dto';
import { PartialType } from '@nestjs/swagger';

export class FriendRequestAcceptInDto extends PartialType(FriendRequestInDto) {}
