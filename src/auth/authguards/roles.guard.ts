import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/users/interfaces/roles.interface';
import { ROLES_KEY } from '../role/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    console.log(context.switchToHttp().getRequest());
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    if (!user) return false;
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
