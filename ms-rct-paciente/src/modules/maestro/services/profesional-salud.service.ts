import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesionalSaludRepository } from '../repositories/profesional-salud.repository';
import { RpcException } from '@nestjs/microservices';
import { PersonaService } from './persona.service';
import { Constantes } from '../../../config/constantes';
import { CreateProfesionalSaludDto } from '../dto/profesional-salud.dto';
import { ProfesionalSalud } from '../entities/profesional-salud.entity';
import { Connection } from 'typeorm';
import { EstablecimientoService } from '../../catalogos/services/establecimiento.service';
import { ProfsaludEstablecimientoService } from './profsalud-establecimiento.service';
import { plainToClass } from 'class-transformer';
import { ProfsaludEstablecimiento } from '../entities/profsalud-establecimiento.entity';

@Injectable()
export class ProfesionalSaludService {
  constructor(
    @InjectRepository(ProfesionalSaludRepository)
    private readonly profesionalSaludRepository: ProfesionalSaludRepository,
    private readonly personaService: PersonaService,
    private readonly establecimientoService: EstablecimientoService,
    private readonly profsaludEstablecimientoService: ProfsaludEstablecimientoService,
    private readonly connection: Connection,
  ) {}

  async createProfesionalSalud(
    createProfesionalSaludDto: CreateProfesionalSaludDto,
  ) {
    this.verificarEstablecimientoMatriz(
      createProfesionalSaludDto.establecimiento_id,
    );
    this.verificarEstablecimientosItinerantes(
      createProfesionalSaludDto.establecimientos_itinerantes,
    );
    createProfesionalSaludDto.itinerante =
      !createProfesionalSaludDto.establecimientos_itinerantes ? 0 : 1;
    const profesionalSalud = this.profesionalSaludRepository.create(
      createProfesionalSaludDto,
    );
    return await this.createProfesionalSaludConPersona(
      profesionalSalud,
      createProfesionalSaludDto.establecimientos_itinerantes,
    );
  }

  async createProfesionalSaludConPersona(
    profesionalSalud: ProfesionalSalud,
    establecimientosItinerantes: number[],
  ) {
    const persona =
      await this.personaService.getPersonaPorIdentificacionParaTransaccion(
        profesionalSalud.persona.identificacion,
      );
    return await this.connection
      .transaction(async (manager) => {
        //si existe persona, editar los cambios
        if (persona) {
          profesionalSalud.persona = Object.assign(
            persona,
            profesionalSalud.persona,
          );
        }
        //crear/guardar persona
        const personaGuardada = await manager.save(profesionalSalud.persona);
        profesionalSalud.persona_id = personaGuardada.id;
        const profSaludGuardado = await manager.save(profesionalSalud);
        //Guardar Profesionales de Salud con establecimientos itinerantes
        if (establecimientosItinerantes) {
          await Promise.all(
            establecimientosItinerantes.map(async (establecimientoId) => {
              const establecimientoProfSalud = {
                personaId: profSaludGuardado.persona.id,
                establecimientoId: establecimientoId,
              };
              const profSalEstablecimiento = plainToClass(
                ProfsaludEstablecimiento,
                establecimientoProfSalud,
              );
              await manager.save(profSalEstablecimiento);
            }),
          );
        }
        //Guardar el establecimiento matriz del Profesional de Salud
        const establecimientoProfSalud = {
          personaId: profSaludGuardado.persona.id,
          establecimientoId: profSaludGuardado.establecimiento_id,
        };
        const profSalEstablecimiento = plainToClass(
          ProfsaludEstablecimiento,
          establecimientoProfSalud,
        );
        await manager.save(profSalEstablecimiento);
        return profSaludGuardado;
      })
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
  }

  async getProfesionalSaludPorId(id: number) {
    const profesionalSalud = await this.profesionalSaludRepository
      .getProfesionalSaludPorIdER(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!profesionalSalud)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Profesional de salud '${id}' no encontrado`,
      });
    return profesionalSalud;
  }

  async getProfesionalSaludValido(
    establecimientoId: number,
    profesionalSaludId: number,
    psicotropico: number,
    codigo_acess: string,
  ) {
    const profesionalSalud = await this.getProfesionalSaludPorId(
      profesionalSaludId,
    );
    const profesionalSaludEstablecimiento =
      await this.profsaludEstablecimientoService.getProfsaludEstablecimientoPorProfesionalId(
        profesionalSaludId,
      );
    if (!profesionalSaludEstablecimiento) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Profesional de salud no tiene un establecimiento registrado ${establecimientoId}`,
      });
    }
    const establecimientEncontrado = profesionalSaludEstablecimiento.find(
      (establecimiento) =>
        establecimiento.establecimientoId == establecimientoId,
    );
    if (
      !establecimientEncontrado &&
      profesionalSalud.establecimiento_id != establecimientoId
    ) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Profesional de salud no existe en el establecimiento ${establecimientoId}`,
      });
    }
    if (profesionalSalud.psicotropico != psicotropico) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Conflicto en los permisos para recetar medicamentos psicotrópicos. Se esperaba '${profesionalSalud.psicotropico}' y se entregó ${psicotropico} en 'prescriptor.psicotropico'`,
      });
    }
    if (profesionalSalud.codigo_acess != codigo_acess) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Profesional de salud con código acess incorrecto`,
      });
    }
    if (profesionalSalud.rol_profesional_id != Constantes.CT_ROL_PRESCRIPTOR) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Profesional de salud no cuenta con el rol 'Prescriptor'`,
      });
    }
    return profesionalSalud;
  }

  async verificarEstablecimientosItinerantes(itinerantes: number[]) {
    if (!itinerantes) {
      return null;
    }
    const mensajeError: string[] = [];
    await Promise.all(
      itinerantes.map((establecimientoId) => {
        const establecimiento =
          this.establecimientoService.getEstablecimientoPorIdSimple(
            establecimientoId,
          );
        if (!establecimiento) {
          mensajeError.push(
            ` Establecimiento '${establecimientoId}': no encontrado`,
          );
        }
      }),
    );

    if (mensajeError.length != 0) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: mensajeError.join(';'),
      });
    }
  }

  async verificarEstablecimientoMatriz(establecimientoId: number) {
    const establecimiento =
      this.establecimientoService.getEstablecimientoPorIdSimple(
        establecimientoId,
      );
    if (!establecimiento)
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Establecimiento matriz '${establecimientoId}' no encontrado`,
      });
  }

  async getProfesionalSaludPorIdentificacion(identificacion: string) {
    const persona = await this.personaService.getPersonaPorIdentificacion(
      identificacion,
    );
    return await this.getProfesionalSaludPorId(persona.id);
  }
}
