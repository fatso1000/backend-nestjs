import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// HASHING
import * as bcrypt from 'bcrypt';

// INTERFACES AND DTO
import { Users } from './interfaces/users.interfaces';
import { CreateUserDTO } from './dto/users.dto';
import { Roles } from './interfaces/roles.interface';
import { Role } from 'src/auth/role/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<Users>,
    @InjectModel('Roles') private readonly roleModel: Model<Roles>,
  ) {}

  public async createUser(
    createUserDTO: CreateUserDTO,
    roleCode: string,
  ): Promise<Users> {
    const user = await this.findByEmail(createUserDTO.email);
    if (user) throw new BadRequestException('User already registered!');

    const role = await this.userRole(roleCode);

    createUserDTO.roles = [role._id];
    createUserDTO.createdAt = createUserDTO.updatedAt = new Date();

    const newPassword = await this.hashPassword(createUserDTO.password);
    const newUser = new this.userModel({
      ...createUserDTO,
      password: newPassword,
    });
    return await newUser.save();
  }

  private async userRole(roleCode: string): Promise<Roles> {
    const role = await this.roleModel
      .findOne({ code: roleCode })
      .select('+email +password')
      .lean<Roles>()
      .exec();
    if (!role) throw new InternalServerErrorException('Role must be defined!');
    return role;
  }

  public async getUsers(): Promise<Users[]> {
    // @ts-ignore
    return await this.userModel.find({}).select("+email +roles -username").lean<Users>().exec();
  }

  public async findByEmail(email: string): Promise<Users> {
    return await this.userModel.findOne({ email: email }).select("+password +roles").lean<Users>().exec();
  }

  public async findByCode(code: string): Promise<Roles | null> {
    return await this.roleModel
      .findOne({ code, status: true })
      .lean<Roles>()
      .exec();
  }

  private async hashPassword(userPassword: string): Promise<string> {
    const saltOrRounds = (await bcrypt.genSalt()) || 10;
    return await bcrypt.hash(userPassword, saltOrRounds);
  }
}
