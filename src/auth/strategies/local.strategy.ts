import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { AuthUserDTO } from "../dto/auth.dto";
import { Users } from "../../users/interfaces/users.interfaces";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "email", passwordField: "password" });
  }

  public async validate(email: string, password: string): Promise<Users> {
    const user = await this.authService.validate({email, password} as AuthUserDTO);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
