import supertest, {SuperTest, Test as Request, Response} from 'supertest';

import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';

import {AppModule} from 'src/app.module';

describe('AppController (e2e)', (): void => {
  let app: INestApplication;
  let request: SuperTest<Request>;

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    request = supertest(app.getHttpServer());
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  describe('GET /hi', (): void => {
    it('should return a greeting message', async (): Promise<void> => {
      const response: Response = await request
        .get('/hi')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200);

      expect(response.text).toBe('Hello World!');
    });
  });
});
