import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthFailureException } from '../exceptions';

// HASHING
import * as bcrypt from 'bcrypt';

// INTERFACES AND DTO
import { AuthUserDTO } from './dto/auth.dto';
import { Users } from '../users/interfaces/users.interfaces';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessToken, AuthUser } from './interfaces/auth.interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private apiKeys: string[] = [
    'Q95h00aQLFBcy4MN5Et^U.R])Slb1u=P/thZ|~0$Rb^Ml_M[5ZJcuk^kPq|Ax|I',
    'n??-|?,T3+VOg"yX:onPGCZ"B5#U/IGZZiFl0jGfhmSm.u<KBcFJFXR4NA)4oH*',
  ];

  public validateApiKey(apiKey: string) {
    return this.apiKeys.find((apiK) => apiKey === apiK);
  }

  public login(user: AuthUser): AccessToken {
    const payload = {
      email: user.email,
      sub: user._id,
    };

    const access_token = this.jwtService.sign(payload);
    return <AccessToken>{
      access_token,
    };
  }

  public async validate(authUserDTO: AuthUserDTO): Promise<Users> {
    const user = await this.userService.findByEmail(authUserDTO.email);
    if (!user) throw new BadRequestException('User not registered!');
    if (!user.password) throw new BadRequestException('Credential not set!');

    const match = await bcrypt.compare(authUserDTO.password, user.password);
    if (!match) throw new AuthFailureException('Authentication failure!');

    return user;
  }

  public async verify(token: string): Promise<Users> {
    const secret = this.configService.get('SECRET');
    const decoded = this.jwtService.verify(token, {
      secret,
    });
    const user = await this.userService.findByEmail(decoded.email);

    return user;
  }
}
