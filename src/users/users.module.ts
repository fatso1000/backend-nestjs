import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { forfeature } from './schema/modules/mongoose.modules';

@Module({
  imports: [
    MongooseModule.forFeature(forfeature),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
