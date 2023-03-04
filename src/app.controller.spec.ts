import {Test, TestingModule} from '@nestjs/testing';

import {AppService} from 'src/app.service';
import {AppController} from 'src/app.controller';

describe('AppController (unit)', (): void => {
  let appService: AppService;
  let appController: AppController;

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      controllers: [AppController]
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  afterAll((): void => {
    jest.resetAllMocks();
  });

  describe('speak()', (): void => {
    it('should greet people', (): void => {
      const spy = jest.spyOn(appService, 'speak');
      const isSpeaking: string = appController.speak();

      expect(spy).toHaveBeenCalled();
      expect(isSpeaking).toBeDefined();
    });
  });
});
