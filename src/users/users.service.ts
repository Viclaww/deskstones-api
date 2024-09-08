import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private user: Model<UserDocument>) {}
  public async findByUsername(username: string) {
    return await this.user.findOne({ username });
  }

  public async findByEmail(email: string) {
    return await this.user.findOne({ email: email });
  }

  async findById(id: string) {
    return await this.user.findById(id);
  }

  async createUser(user: any) {
    return await this.user.create(user);
  }
}
