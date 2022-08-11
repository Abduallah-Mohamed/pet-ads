import { Test, TestingModule } from '@nestjs/testing';
import { PetAdsService } from './pet-ads.service';

describe('PetAdsService', () => {
  let service: PetAdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetAdsService],
    }).compile();

    service = module.get<PetAdsService>(PetAdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
