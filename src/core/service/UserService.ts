import { User } from "../domain/User";
import { IUser } from "../ports/repository/UserRepository";
import { UserAlreadyExists } from "../error/UserError";
import { HPassService } from "./Auth/HashPassService";

export class UserService {
  private readonly userRepository: IUser<User>;
  private readonly hPassService: HPassService;
  constructor(userRepository: IUser<User>, hPassService: HPassService) {
    this.userRepository = userRepository;
    this.hPassService = hPassService;
  }

  public async save(user: User): Promise<User | Error> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new UserAlreadyExists("User already exists");
    }
    user.password = await this.hPassService.hashPass(user.password);
    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }

  public async findByEmail(user: User): Promise<User | null> {
    const userDb = await this.userRepository.findByEmail(user.email);
    return userDb;
  }
}
