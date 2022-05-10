import { Test, TestingModule } from '@nestjs/testing';
import { EncryptInterceptorMock } from '../../../modules/conciliacion/tests/mocks/encrypt.interceptor-mock';
import { ThrottlerBehindProxyGuard } from '../../../guards/throttler-behind-proxy.guard';

import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from './mocks/auth-service-mock';
import { ThrottlerBehindProxyGuardMock } from './mocks/throttler-behind-proxy.guard-mock';
import { DataTest } from './mocks/data-test';
import { AuthDto, ReadAuthDto, refreshTokenDto } from '../dto/auth.dto';
import { plainToClass } from 'class-transformer';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const AuthServiceProvider = {
      provide: AuthService,
      useClass: AuthServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, AuthServiceProvider],
    })
      .overrideProvider(AuthService)
      .useClass(AuthServiceMock)
      .overrideGuard(ThrottlerBehindProxyGuard)
      .useValue(ThrottlerBehindProxyGuardMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should Autenticate user', async () => {
    const data = DataTest.DATA_AUTH;
    const credenciales = plainToClass(AuthDto, data);
    const token = plainToClass(ReadAuthDto, data);

    expect(await controller.authenticateUser(credenciales)).toEqual(token);

    const authenticateUser = jest.spyOn(service, 'authenticateUser');
    controller.authenticateUser(credenciales);
    expect(authenticateUser).toBeCalled();
    expect(authenticateUser).toHaveBeenCalledWith(credenciales);
    expect(authenticateUser).toBeCalledTimes(1);
  });

  it('should refresh token', async () => {
    const data_tk = DataTest.DATA_AUTH_REFRESH_TOKEN;
    const token_to_refresh = plainToClass(refreshTokenDto, data_tk);
    const data_fr = DataTest.DATA_AUTH;
    const token = plainToClass(ReadAuthDto, data_fr);

    expect(await controller.refreshToken(token_to_refresh)).toEqual(token);

    const refreshToken = jest.spyOn(service, 'refreshToken');
    controller.refreshToken(token_to_refresh);
    expect(refreshToken).toBeCalled();
    expect(refreshToken).toHaveBeenCalledWith(token_to_refresh);
    expect(refreshToken).toBeCalledTimes(1);
  });
});
