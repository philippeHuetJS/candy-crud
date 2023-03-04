import {Test, TestingModule} from '@nestjs/testing';

import {AppService} from 'src/app.service';

describe('AppService (unit)', (): void => {
  let appService: AppService;

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService]
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  afterAll((): void => {
    jest.resetAllMocks();
  });

  describe('speak()', (): void => {
    it('should greet people', (): void => {
      const spy = jest.spyOn(appService, 'speak');
      const isSpeaking: string = appService.speak();

      expect(spy).toHaveBeenCalled();
      expect(isSpeaking).toBeDefined();
    });
  });
});
