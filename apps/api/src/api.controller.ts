import { Controller, Get } from '@nestjs/common';
import { ApiServer } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiServer) {}

  // @Get()
  // getHello(): string {
  //   return this.apiService.getHello();
  // }
}
