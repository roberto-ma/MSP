import { Module } from '@nestjs/common';
import { RecetaReImpService } from './services/receta.reimpresion.service';
import { RecetaReImpController } from './controllers/receta.reimpresion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaReImpRepository } from './repositories/receta-impresion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecetaReImpRepository])],
  controllers: [RecetaReImpController],
  providers: [RecetaReImpService],
  exports: [RecetaReImpService],
})
export class RecetaImpresionModule {}
