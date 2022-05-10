import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ReaccionAdversaService } from '../services/reaccion-adversa.service';

@Controller()
export class ReaccionAdversaController {
  constructor(private readonly reaccionAdversaService: ReaccionAdversaService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getReaccionAdversaPorId',
  })
  getReaccionAdversaPorId(@Payload() id: number) {
    return this.reaccionAdversaService.getReaccionAdversaPorId(id);
  }
}
