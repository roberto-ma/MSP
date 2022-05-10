import { plainToClass } from 'class-transformer';
import { AuthDto, ReadAuthDto, refreshTokenDto } from '../../dto/auth.dto';
import { DataTest } from './data-test';

export class AuthServiceMock {
  async authenticateUser(authDto: AuthDto): Promise<any> {
    const data = DataTest.DATA_AUTH;
    const token = plainToClass(ReadAuthDto, data);
    return Promise.resolve(token);
  }

  async refreshToken(refreshTokenDto: refreshTokenDto): Promise<any> {
    const data = DataTest.DATA_AUTH;
    const token = plainToClass(ReadAuthDto, data);
    return Promise.resolve(token);
  }
}
