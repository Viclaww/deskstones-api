import { Injectable } from '@nestjs/common';
import User from '../models/user.model';

@Injectable()
export class UsersService {
  user = User;
  public async findByUsername(username: string) {
    return await this.user.findOne({ username });
  }

  async findById(id: string) {
    return await this.user.findById(id);
  }

  async create(user: any) {
    return await this.user.create(user);
  }
}
