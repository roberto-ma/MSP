import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaImpFarmaciaService } from '../../modules/recetaFarmacia/services/recetaFarmacia.service';
import { RecetaImpFarmaciaController } from '../../modules/recetaFarmacia/controllers/recetaFarmacia.controller';
import { RecetaFarmaciaRepository } from '../../modules/recetaFarmacia/repositories/recetaFarmacia.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecetaFarmaciaRepository])],
  controllers: [RecetaImpFarmaciaController],
  providers: [RecetaImpFarmaciaService],
  exports: [RecetaImpFarmaciaService],
})
export class RecetaImpFarmaciaModule {}
