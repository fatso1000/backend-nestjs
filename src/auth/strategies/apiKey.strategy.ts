import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

export interface doneI {
    (state: boolean): boolean
}

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      (apiKey: string, done: doneI, req: Request) => {
        const checkKey = authService.validateApiKey(apiKey);
        if (!checkKey) return done(false);
        return done(true);
      },
    );
  }
}
