import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';
import { ValidationErrorResponseDto } from '../dto/validation-error-response.dto';

export function ApiNotFound() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: '리소스를 찾을 수 없음',
      type: ErrorResponseDto,
    }),
  );
}

export function ApiForbidden() {
  return applyDecorators(
    ApiForbiddenResponse({ description: '권한 없음', type: ErrorResponseDto }),
  );
}

export function ApiBadRequest() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: '잘못된 요청 데이터',
      type: ValidationErrorResponseDto,
    }),
  );
}
