import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PageMetaDto } from '@libs/common/dto/page-meta.dto';
import { ResponseEntity } from '@libs/common/network/response-entity';

export declare type ApiResponseEntityMetaOptions = {
  type?: Type<any>;
  summary?: string;
  isArray?: boolean;
  isPagination?: boolean;
  isPaginationExtra?: boolean;
};
export const ApiResponseEntity = (options?: ApiResponseEntityMetaOptions) => {
  if (!options || !options.type)
    return applyDecorators(
      HttpCode(HttpStatus.OK),
      ApiOperation({ summary: options?.summary }),
      ApiExtraModels(Response),
      ApiResponse({ status: 403, description: 'Forbidden' }),
      ApiOkResponse({ type: Response }),
    );
  let properties: Record<string, any>;
  if (options?.isArray) {
    properties = {
      data: { type: 'array', items: { $ref: getSchemaPath(options.type) } },
    };
  } else if (options?.isPagination) {
    properties = {
      data: { type: 'array', items: { $ref: getSchemaPath(options.type) } },
      meta: { $ref: getSchemaPath(PageMetaDto) },
    };
  } else if (options?.isPaginationExtra) {
    properties = {
      data: { $ref: getSchemaPath(options.type) },
      meta: { $ref: getSchemaPath(PageMetaDto) },
    };
  } else {
    properties = { data: { $ref: getSchemaPath(options.type) } };
  }
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiExtraModels(ResponseEntity),
    ApiExtraModels(options.type),
    ApiExtraModels(PageMetaDto),
    ApiOperation({ summary: options?.summary }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseEntity) },
          {
            properties: properties,
          },
        ],
      },
    }),
  );
};

export class ApiPageResponseEntity {}
