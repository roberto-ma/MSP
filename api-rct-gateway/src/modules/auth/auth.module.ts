import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { EncryptController } from './controllers/encrypt.controller';

@Module({
  imports: [HttpModule],
  controllers: [AuthController, EncryptController],
  providers: [AuthService],
})
export class AuthModule {}
