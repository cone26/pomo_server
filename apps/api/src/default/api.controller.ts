import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResponseEntity } from '@app/common/decorator/api-response-entity.decorator';
import { Response, ResponseEntity } from '@app/common/network/response-entity';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/health')
  @ApiResponseEntity({ summary: '헬스 체크' })
  async getHealth(): Promise<Response> {
    return new ResponseEntity().ok().body(this.apiService.health()).build();
  }
}
