import {BadRequestException} from '@nestjs/common';

export class CatBadRequestException extends BadRequestException {
  static readonly code = 'INVALID_ID';
  static readonly message = 'Unable to cast object.';

  constructor() {
    super({
      code: CatBadRequestException.code,
      message: CatBadRequestException.message
    });
  }
}
