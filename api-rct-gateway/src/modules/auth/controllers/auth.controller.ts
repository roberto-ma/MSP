import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards, Version, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto, ReadAuthDto, refreshTokenDto } from '../dto/auth.dto';
import { Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ThrottlerBehindProxyGuard } from '../../../guards/throttler-behind-proxy.guard';
import { Constantes } from '../../../config/constantes';
import { InputFarmaciaDto } from '../../receta/dto/encrypt.dto';
import { InputEntidadSaludDto } from '../../receta/dto/encrypt.dto';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version(Constantes.API_V1)
  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('login')
  @Unprotected()
  async authenticateUser(@Body() authDto: AuthDto) {
    const token = await this.authService.authenticateUser(authDto);
    return plainToClass(ReadAuthDto, token);
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('login/farmacia')
  @Unprotected()
  @ApiBody({
    type: InputFarmaciaDto,
    required: true,
    isArray: false,
  })
  async authenticateUserEncryptFarmacia(@Body() authDto: AuthDto) {
    const token = await this.authService.authenticateUser(authDto);
    return plainToClass(ReadAuthDto, token);
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('login/entidad-salud')
  @Unprotected()
  @ApiBody({
    type: InputEntidadSaludDto,
    required: true,
    isArray: false,
  })
  async authenticateUserEncryptEntidadSalud(@Body() authDto: AuthDto) {
    const token = await this.authService.authenticateUser(authDto);
    return plainToClass(ReadAuthDto, token);
  }

  @Version(Constantes.API_V1)
  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('refresh-token')
  @Unprotected()
  refreshToken(@Body() refreshTokenDto: refreshTokenDto) {
    const token = this.authService.refreshToken(refreshTokenDto);
    return plainToClass(ReadAuthDto, token);
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('refresh-token/farmacia')
  @Unprotected()
  @ApiBody({
    type: InputFarmaciaDto,
    required: true,
    isArray: false,
  })
  refreshTokenEncryptFarmacia(@Body() refreshTokenDto: refreshTokenDto) {
    const token = this.authService.refreshToken(refreshTokenDto);
    return plainToClass(ReadAuthDto, token);
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('refresh-token/entidad-salud')
  @Unprotected()
  @ApiBody({
    type: InputEntidadSaludDto,
    required: true,
    isArray: false,
  })
  refreshTokenEncryptEntidadSalud(@Body() refreshTokenDto: refreshTokenDto) {
    const token = this.authService.refreshToken(refreshTokenDto);
    return plainToClass(ReadAuthDto, token);
  }
}
