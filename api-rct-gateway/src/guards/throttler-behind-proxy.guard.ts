// throttler-behind-proxy.guard.ts
import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    if (req.ips?.length) {
      console.log(req.ips[0]);
      return req.ips[0];
    }
    console.log(req.ip);
    return req.ip;
  }
}
