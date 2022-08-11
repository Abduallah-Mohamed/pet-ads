import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreatePetAdsDto } from './dtos/createPet-ads.dto';
import { PetAd } from './entities/pet-ads.entity';

@Injectable()
export class PetAdsService {
  constructor(
    @InjectRepository(PetAd)
    private readonly petAdsRepository: Repository<PetAd>,
  ) {}

  create(petAd: CreatePetAdsDto): Promise<PetAd> {
    console.log(petAd.user);
    const createdPetAd = this.petAdsRepository.create(petAd);

    console.log(createdPetAd);

    return this.petAdsRepository.save(createdPetAd);
  }

  async findAll(nameSpace: any, agent: any): Promise<any> {
    if (
      nameSpace !== 'popup' &&
      nameSpace !== 'under-services' &&
      nameSpace !== 'above-footer'
    ) {
      nameSpace = ['popup', 'under services', 'above footer'];
    } else {
      nameSpace = [nameSpace];
    }

    if (agent !== 'mobile' && agent !== 'desktop' && agent !== 'tablet') {
      agent = ['mobile', 'tablet', 'desktop'];
    } else {
      agent = [agent];
    }

    return this.petAdsRepository.find({
      where: { spaceName: In(nameSpace), agent: In(agent) },
    });
  }

  async findOne(id: number): Promise<any> {
    const ad = await this.petAdsRepository.findOneBy({ id });

    ad.views += 1;

    return await this.petAdsRepository.save(ad);
  }
}
