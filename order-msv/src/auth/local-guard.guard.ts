import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token1 = 'abc';
    const token = context.switchToHttp().getRequest().headers.authorization;
    console.log(token, token1);
    if (!token || token.split(' ')[1] !== token1) {
      throw new UnauthorizedException('Can not access to the resource');
    }
    return true;
  }
}
