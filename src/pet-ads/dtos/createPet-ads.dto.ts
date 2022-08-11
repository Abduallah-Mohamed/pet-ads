import { IsString, IsDate, IsEmpty, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreatePetAdsDto {
  @IsString()
  spaceName: string;

  @IsString()
  agent: string;

  @IsString()
  description: string;

  @IsString()
  imageOrVideo: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsEmpty()
  views: number;

  @IsNotEmpty()
  user: User;
}
