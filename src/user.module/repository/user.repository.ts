import { EntityRepository, Repository } from 'typeorm';
import { isNil } from '@/common.module/utls/type-extension';
import { User } from '../entity/user';
import { AuthCredentialsInput } from '../dtos/auth-credentials.input';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsInput,
  ): Promise<User> {
    const { phone, password } = authCredentialsDto;
    const user = await this.findOne({ phone });

    return !isNil(user) && (await user.validatePassword(password)) ? user : null;
  }
}
