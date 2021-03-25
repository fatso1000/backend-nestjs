import {
  Controller,
  Post,
  Get,
  HttpStatus,
  Body,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/authguards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/authguards/local-auth.guard';
import { RolesGuard } from 'src/auth/authguards/roles.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';
import { SuccessResponse } from 'src/core/ApiResponse';
import { CreateUserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  async createUser(@Res() res: Response, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDTO, Role.USER);

    const { username, id, email } = user;
    const response = { id, email, username };

    new SuccessResponse('User created Successfully', response).send(res);
  }

  @UseGuards(LocalAuthGuard)
  @Get('/')
  async getUsers(@Req() req, @Res() res: Response) {
    const users = await this.userService.getUsers();

    new SuccessResponse('Users list', users).send(res);
  }
}
