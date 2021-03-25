import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    passport.authenticate(
      'headerapikey',
      { session: false, failureMessage: 'Error' },
      (value) => {
        if (value) {
          next();
        } else {
          throw new UnauthorizedException(
            'api key does not exists in the header!',
          );
        }
      },
    )(req, res, next);
  }
}
