import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  speak(): string {
    return 'Hello World!';
  }
}
