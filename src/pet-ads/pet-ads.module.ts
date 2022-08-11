import { PetAd } from './entities/pet-ads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PetAdsService } from './pet-ads.service';
import { PetAdsController } from './pet-ads.controller';

@Module({
  providers: [PetAdsService],
  controllers: [PetAdsController],
  imports: [TypeOrmModule.forFeature([PetAd])],
})
export class PetAdsModule {}
