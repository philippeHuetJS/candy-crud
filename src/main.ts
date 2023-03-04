import morgan from 'morgan';

import {NestFactory} from '@nestjs/core';
import {Logger, INestApplication, ValidationPipe} from '@nestjs/common';

import {AppModule} from 'src/app.module';

async function bootstrap() {
  try {
    const app: INestApplication = await NestFactory.create(AppModule, {
      logger: new Logger()
    });

    app.use(morgan('dev'));

    if (process.env.NODE_ENV !== 'production') {
      app.enableCors();
    }

    app.useGlobalPipes(
      new ValidationPipe({
        transformOptions: {
          exposeDefaultValues: true,
          excludeExtraneousValues: true
        },
        transform: true
      })
    );

    await app.listen(process.env.PORT ?? 3000);

    console.info('[Bootstrap] NestJS server OK');
  } catch (error: unknown) {
    console.error('[Bootstrap] NestJS server NOK', {error});

    process.exit(5);
  }
}

void bootstrap();
