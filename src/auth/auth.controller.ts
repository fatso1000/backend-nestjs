import {
  Controller,
  Post,
  Get,
  HttpStatus,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './authguards/local-auth.guard';
import { JwtAuthGuard } from './authguards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  verifyUser(
    @Res() res: Response,
    @Req() req,
    @Body() authUserDTO: AuthUserDTO,
  ): Response {
    const { _id } = req.user;
    const user = this.authService.login({ ...authUserDTO, _id });

    const { access_token } = user;
    const response = { access_token };

    return res.status(HttpStatus.OK).json({
      message: 'User verified succesfully!',
      statusCode: HttpStatus.OK,
      response,
    });
  }

  // NEEDS A VALID JWT TOKEN FOR THIS ROUTE
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req, @Res() res: Response): Response {
    const response = req.user;
    return res.status(HttpStatus.OK).json({
      message: 'Logged user data!',
      statusCode: HttpStatus.OK,
      response,
    });
  }
}
