import {NotFoundException} from '@nestjs/common';

export class CatNotFoundException extends NotFoundException {
  static readonly code = 'INVALID_URL';
  static readonly message = 'Cat does not exist.';

  constructor() {
    super({
      code: CatNotFoundException.code,
      message: CatNotFoundException.message
    });
  }
}
