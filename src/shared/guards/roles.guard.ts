import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_ARE_NOT_ASSIGNED_FOR_ENDPOINT } from '../errors/errorMessages';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../types/userPayload';
import { UserRoleEnum } from '../../domain/user/shared/enums/userRole.enum';
import { FastifyRequest } from 'fastify';
import config from '../../infrastructure/config/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.getRoles(context);
    RolesGuard.assertRolesAreAssignedForEndpoint(roles);
    const authHeader = RolesGuard.getAuthHeader(context);

    return authHeader
      ? this.isRoleFromHeaderAllowed(roles, authHeader)
      : this.isVisitorAllowed(roles)
  }

  private getRoles(context: ExecutionContext): Set<UserRoleEnum> {
    return new Set<UserRoleEnum>(this.reflector.get<UserRoleEnum[] | undefined>('roles', context.getHandler()));
  }

  private static assertRolesAreAssignedForEndpoint(roles: Set<UserRoleEnum>): void {
    if (roles.size === 0) {
      throw new Error(ROLES_ARE_NOT_ASSIGNED_FOR_ENDPOINT);
    }
  }

  private static getAuthHeader(context: ExecutionContext): string | undefined {
    return context.switchToHttp().getRequest<FastifyRequest>().headers.authorization;
  }

  private isRoleFromHeaderAllowed(roles: Set<UserRoleEnum>, authHeader: string): boolean {
    try {
      const accessToken = authHeader.split(' ')[1];
      const payload = this.jwtService.verify(accessToken, { secret: config.auth.jwtSecret }) as UserPayload;
      return roles.has(payload.role);
    } catch (e) {
      return this.isVisitorAllowed(roles);
    }
  }

  private isVisitorAllowed(roles: Set<UserRoleEnum>): boolean {
    return roles.has(UserRoleEnum.VISITOR);
  }
}
