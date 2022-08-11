import { UsersService } from './../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate the user by email and password
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  // Lgoin Method
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  // Register Method
  async register(user: User | any): Promise<any> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.userService.create(user);
  }

  // Verify the user by token
  async verifyUser(token: string): Promise<any> {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    console.log(decoded);

    const user = this.userService.findByEmail(decoded.email);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return user;
  }
}
