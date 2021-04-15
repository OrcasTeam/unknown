import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class Encryption {
  static md5Encrypt(val: string) {
    return crypto.createHash('md5').update(val).digest('hex').toString();
  }
}
