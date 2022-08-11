import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

// console.log('Role', Role);
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
// console.log('Roles', Roles(Role.ADMIN, Role.USER));
