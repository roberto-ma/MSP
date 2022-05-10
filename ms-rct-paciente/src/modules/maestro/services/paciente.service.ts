import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePacienteDto } from '../dto/paciente.dto';
import { PacienteRepository } from '../repositories/paciente.repository';
import { RpcException } from '@nestjs/microservices';
import { Connection } from 'typeorm';
import { Paciente } from '../entities/paciente.entity';
import { PersonaService } from './persona.service';
import { PersonaSoapService } from '../helpers/persona.soap.service';
import { Constantes } from '../../../config/constantes';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(PacienteRepository)
    private readonly pacienteRepository: PacienteRepository,
    private readonly personaService: PersonaService,
    private readonly personaSoaService: PersonaSoapService,
    private readonly connection: Connection,
  ) {}

  async createPaciente(createPacienteDto: CreatePacienteDto) {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    return await this.createPacienteConPersona(paciente);
  }

  async createPacienteConPersona(paciente: Paciente) {
    const persona =
      await this.personaService.getPersonaPorIdentificacionParaTransaccion(
        paciente.persona.identificacion,
      );
    return await this.connection
      .transaction(async (manager) => {
        if (persona) {
          paciente.persona = Object.assign(persona, paciente.persona);
        } else {
          if (
            paciente.persona.tipo_identificacion_id ==
            Constantes.CT_TIPO_DOCUMENTO_CEDULA
          ) {
            const personasoa =
              await this.personaSoaService.getPersonaFromRegistroCivil(
                paciente.persona.identificacion,
              );

            if (personasoa) {
              if (personasoa.vivo == Constantes.ESTADO_GENERAL_INACTIVO) {
                throw new RpcException({
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: 'La persona esta fallecida',
                });
              }

              paciente.persona.nombres = personasoa.nombres;
              paciente.persona.apellidos = personasoa.apellidos;
              paciente.persona.fecha_nacimiento = personasoa.fecha_nacimiento
                ? personasoa.fecha_nacimiento
                : paciente.persona.fecha_nacimiento;
              paciente.persona.sexo = personasoa.sexo
                ? personasoa.sexo
                : paciente.persona.sexo;
            }
          }
        }

        const personaGuardada = await manager.save(paciente.persona);
        paciente.persona_id = personaGuardada.id;
        return await manager.save(paciente);
      })
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
  }

  // async getPacientes() {
  //   return await this.pacienteRepository.find().catch((error) => {
  //     throw new RpcException({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error.message,
  //     });
  //   });
  // }

  async getPacientePorId(id: number) {
    const paciente = await this.pacienteRepository
      .getPacientePorIdER(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!paciente)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Paciente '${id}' no encontrado`,
      });
    return paciente;
  }

  async getPacientePorIdentificacion(identificacion: string) {
    const persona = await this.personaService.getPersonaPorIdentificacion(
      identificacion,
    );
    return await this.getPacientePorId(persona.id);
  }

  // async updatePaciente(id: number, updatePacienteDto: UpdatePacienteDto) {
  //   const paciente = await this.getPacientePorId(id);
  //   const pacienteEditado = Object.assign(paciente, updatePacienteDto);

  //   return await this.pacienteRepository
  //     .save(pacienteEditado)
  //     .catch((error) => {
  //       throw new RpcException({
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         message: error.message,
  //       });
  //     });
  // }
}
