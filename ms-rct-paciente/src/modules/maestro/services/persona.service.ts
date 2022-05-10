import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { PersonaRepository } from '../repositories/persona.repository';
import { CreatePersonaDto } from '../dto/persona.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(PersonaRepository)
    private readonly personaRepository: PersonaRepository,
  ) {}

  async create() {
    return this.personaRepository.create();
  }

  async createPersona(createPersonaDto: CreatePersonaDto) {
    const persona = this.personaRepository.create(createPersonaDto);
    return await this.personaRepository.save(persona).catch((error) => {
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    });
  }

  // async getPersonas() {
  //   return await this.personaRepository.find().catch((error) => {
  //     throw new RpcException({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error.message,
  //     });
  //   });
  // }

  async getPersonaPorId(id: number) {
    const persona = await this.personaRepository
      .getPersonaPorIdER(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!persona)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Persona '${id}' no encontrado`,
      });
    return persona;
  }

  async getPersonaPorIdentificacion(identificacion: string) {
    const persona = await this.personaRepository
      .getPersonaPorIdentificacionER(identificacion)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!persona)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Persona con identificación '${identificacion}' no encontrado`,
      });
    return persona;
  }

  async getPersonaPorIdentificacionParaTransaccion(identificacion: string) {
    return await this.personaRepository.getPersonaPorIdentificacionER(
      identificacion,
    );
  }

  // async updatePersona(
  //   id: number,
  //   updatePersonaDto: UpdatePersonaDto,
  //   usernameUsuarioAutenticado: string,
  // ) {
  //   const persona = await this.getPersonaPorId(id);
  //   persona.usuario_modificacion = usernameUsuarioAutenticado;
  //   const personaEditada = Object.assign(persona, updatePersonaDto);
  //   return await this.personaRepository.save(personaEditada).catch((error) => {
  //     throw new RpcException({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error.message,
  //     });
  //   });
  // }
}
