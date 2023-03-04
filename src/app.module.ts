import {Module} from '@nestjs/common';

import {AppController} from 'src/app.controller';
import {AppService} from 'src/app.service';
import {CatModule} from 'src/cats/cat.module';
import {SharedModule} from 'src/shared/shared.module';

@Module({
  imports: [CatModule, SharedModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
