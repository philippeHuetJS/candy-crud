import {ConfigModule, ConfigService} from '@nestjs/config';
import {Module, DynamicModule} from '@nestjs/common';
import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';

import MongooseConfig from 'src/shared/configs/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [MongooseConfig]
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<MongooseModuleOptions>('mongoose')?.uri
      })
    })
  ] as DynamicModule[],
  exports: [ConfigModule, MongooseModule]
})
export class SharedModule {}
