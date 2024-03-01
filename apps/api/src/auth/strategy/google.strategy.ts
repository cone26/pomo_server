import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthLoginInDto } from '../dto/auth-login-in.dto';
import { AuthService } from '../auth.service';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3002/auth/callback/google', // 이 부분은 구글 콘솔에서 설정한대로. 승인된 리디렉션 URI
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, provider } = profile;
    const socialLoginUserInfo: AuthLoginInDto = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      socialProvider: provider,
      externalId: profile.id,
      accessToken,
      refreshToken,
    };
    try {
      const user = await this.authService.saveUser(socialLoginUserInfo);

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
