import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '@app/common/dto/page-meta.dto';

export class Response {
  @ApiProperty({ example: 0 })
  private readonly code: number;
  @ApiProperty({ example: {} })
  private readonly data?: any | any[];
  @ApiProperty({ example: '' })
  private readonly message?: string;

  constructor(code: number, data: any | any[], message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}

export class ResponseEntity<T> {
  @ApiProperty({ example: 0 })
  private code: number;

  @ApiProperty()
  private data: T | T[];

  @ApiProperty({ example: '' })
  private message?: string;

  private meta?: any;

  public ok(): ResponseEntity<T> {
    this.code = 0;
    return this;
  }

  public error(code = 999, message = 'Error'): ResponseEntity<T> {
    this.code = code;
    this.message = message;
    return this;
  }

  public body(data: T | T[]): ResponseEntity<T> {
    this.data = data;
    return this;
  }

  public setPageMeta(pageMeta: PageMetaDto): ResponseEntity<T> {
    this.meta = pageMeta;
    return this;
  }

  build(): Response {
    return new Response(this.code, this.data, this.message);
  }
}
