import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService {
  constructor(private readonly configService: ConfigService) {}

  health(): Record<string, string> {
    return { environment: this.configService.get<string>('NODE_ENV') };
  }
}
