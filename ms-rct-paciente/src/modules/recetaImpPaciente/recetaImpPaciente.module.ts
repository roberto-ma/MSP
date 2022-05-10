import { Module } from '@nestjs/common';
import { RecetaImpPacienteService } from '../recetaImpPaciente/services/recetaImpPaciente.service';
import { RecetaImpPacienteController } from '../recetaImpPaciente/controllers/recetaImpPaciente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaRepository } from '../recetaImpPaciente/repositories/recetaImpPaciente';

@Module({
  imports: [TypeOrmModule.forFeature([RecetaRepository])],
  controllers: [RecetaImpPacienteController],
  providers: [RecetaImpPacienteService],
  exports: [RecetaImpPacienteService],
})
export class RecetaImpPacienteModule {}
