import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token1 = 'abc';
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ')[1];
    console.log(token, token1);
    if (token === token1) {
      return true;
    }
    return false;
  }
}
