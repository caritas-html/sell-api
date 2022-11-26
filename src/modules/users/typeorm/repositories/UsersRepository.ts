import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    // it can be undefined also, cause this method can return undefined, the same to next methods!
    const user = await this.findOne({
      where: { name },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }
}

export default UsersRepository;
