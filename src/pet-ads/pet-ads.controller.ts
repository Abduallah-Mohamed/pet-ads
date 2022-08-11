import { JWTAuthGuard } from './../auth/guards/jwt-auth.guard';
// import { LocalAuthGaurd } from './../auth/guards/local-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { PetAdsService } from './pet-ads.service';
import { CreatePetAdsDto } from './dtos/createPet-ads.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Cache } from 'cache-manager';

@Controller('pet-ads')
export class PetAdsController {
  constructor(
    private readonly petAdsService: PetAdsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Post()
  createPetAd(@Body() body: CreatePetAdsDto) {
    return this.petAdsService.create(body);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/pet-ads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    return file.path;
  }

  @Get()
  async findAll(
    @Query('nameSpace') namespace: string,
    @Query('agent') agent: string,
  ): Promise<any> {
    const cache = await this.cacheManager.get('CachedPetAds');

    if (cache) {
      return {
        data: cache,
        message: 'Cached',
        LoadsFrom: 'redis cache',
      };
    }

    const data = await this.petAdsService.findAll(namespace, agent);
    await this.cacheManager.set('CachedPetAds', data);
    console.log(await this.cacheManager.get('CachedPetAds'));
    // console.log(await this.cacheManager.set('CachedPetAds', data));

    return {
      data,
      message: 'Not Cached',
      LoadsFrom: 'database',
    };
    // return this.petAdsService.findAll(namespace, agent);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.petAdsService.findOne(+id);
  }
}
