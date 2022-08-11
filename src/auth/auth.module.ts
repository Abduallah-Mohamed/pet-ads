import { RolesGuard } from './guards/roles.guard';
import { JWTStartegy } from './stratigies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './stratigies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStartegy, LocalStrategy, RolesGuard],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    UsersModule,
  ],
  // exports: [AuthService],
})
export class AuthModule {}
