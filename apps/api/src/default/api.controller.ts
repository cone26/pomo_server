import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { Response, ResponseEntity } from '@libs/common/network/response-entity';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/health')
  @ApiResponseEntity({ summary: '헬스 체크' })
  async getHealth(): Promise<Response> {
    return new ResponseEntity().ok().body(this.apiService.health()).build();
  }
}
