import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { AdminService } from './../admin/admin.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = process.env;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    AdminService,
    JwtStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
