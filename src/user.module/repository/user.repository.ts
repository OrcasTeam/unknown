import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user';
import { AuthCredentialsDto } from '../dtos/auth-credentials';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { phone, password } = authCredentialsDto;
    const user = await this.findOne({ phone });

    return user && (await user.validatePassword(password)) ? user : null;
  }
}
