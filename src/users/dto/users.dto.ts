import { Roles } from '../interfaces/roles.interface';

export class CreateUserDTO {
  readonly email: string;
  readonly username: string;
  roles: Roles[];
  readonly password: string;
  createdAt: Date;
  updatedAt: Date;
}
