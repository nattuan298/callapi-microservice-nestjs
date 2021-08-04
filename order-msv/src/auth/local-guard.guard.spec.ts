import { LocalAuthGuard } from './local-guard.guard';

describe('LocalGuardGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
