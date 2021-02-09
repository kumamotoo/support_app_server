import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

const { JWT_SECRET_KEY } = process.env;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate({ email, password }: any) {
    const account = await this.authService.validate({ email, password });
    if (!account) {
      throw new UnauthorizedException();
    }
    return { email, password };
  }
}
