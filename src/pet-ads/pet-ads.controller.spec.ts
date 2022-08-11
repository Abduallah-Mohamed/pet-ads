import { Test, TestingModule } from '@nestjs/testing';
import { PetAdsController } from './pet-ads.controller';

describe('PetAdsController', () => {
  let controller: PetAdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetAdsController],
    }).compile();

    controller = module.get<PetAdsController>(PetAdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
