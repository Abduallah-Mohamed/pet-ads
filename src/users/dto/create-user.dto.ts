import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  user: User;
}
