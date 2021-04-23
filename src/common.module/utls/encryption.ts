import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class Encryption {
  static md5Encrypt(val: string) {
    return crypto.createHash('md5').update(val).digest('hex').toString();
  }

  static hash(val: string){
    return crypto.createHash('hash').update(val).digest('hex').toString();
  }
}
