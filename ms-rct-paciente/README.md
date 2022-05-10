<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>
<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
  <a href="https://nodejs.org/es/" target="_blank">
    <img src="https://img.shields.io/badge/node-%3E%3D%2016.13.1-blue" alt="node version">
  </a>
  <a href="https://nodejs.org/es/" target="_blank">
    <img src="https://img.shields.io/badge/npm-%3E%3D%208.1.2-blue" alt="npmversion">
  </a>
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/nestjs-8.0.0-blue" alt="nesjsversion">
  </a>
</div>

# Microservicio Receta Paciente
**ESTADO**: ACTIVO

### Tabla de contenidos
1. [Actores](#actores)
2. [Fases del proyecto](#fases)
3. [Aspectos funcionales](#aspectos-funcionales)
4. [Aspectos técnicos](#aspectos-técnicos)
5. [Procedimiento de instalación](#procedimiento-de-instalación)
6. [Otros documentos](#otros-documentos)

## Actores
* **Lenin Vallejos** / MSP - Responsable Técnico / lenin.vallejos@msp.gob.ec
* **Erika Calderón** / MSP - Responsable Técnico / erika.calderon@msp.gob.ec
* **Anthony Loyaga** / MSP - Responsable Técnico / anthony.loyaga@msp.gob.ec
* **María Elena Santillan** / MSP - Responsable Funcional

## Fases
- [ ] Planificación
- [ ] Implementación
- [ ] Producción

## Aspectos funcionales

### Objetivo:

Esta aplicación backend expondrá servicios para registrar, buscar y modificar información correspondiente a los pacientes del PRAS.

### A quien va dirigido:

Este aplicativo fue diseñado y elaborado para reutilizar los servicios de paciente por parte del personal técnico que necesiten desarrollar un nuevo proyecto de software con estas tecnologías.

## Aspectos Técnicos

### Plataforma tecnológica
| Característica | Detalle |
| ------ | ------ |
| Tipo de aplicación | Aplicación Backend |
| Framework de Desarrollo | NestJS - Express |
| Servidor de Aplicaciones | PM2 - Nodemon |
| Servidor de Base de Datos | PRAS |
| Lenguaje de programación | NodeJS - TypeScript |

### Prerrequisitos

* Instalación de [NodeJs v16.13.1](https://nodejs.org/es/)
* Instalación de [NestJS v8.0](https://docs.nestjs.com/) (cli): `npm i -g @nestjs/cli`
* Instalación de [Instant Client](https://www.oracle.com/database/technologies/instant-client/downloads.html) (Conexión a base de datos Oracle).
* Instalación de [Docker](https://docs.docker.com/get-docker/) (Para despliegue en ambientes)

Nota: Esta aplicación fue creada a partir de la plantilla [[backend-api-base]](https://git.msp.gob.ec/microservicios/proyectos/plantillas/backend-api-base)

## Procedimiento de Instalación

### Instalación de la aplicación en entorno local 
Para futuros mantenimientos y nuevas funcionalidades que se implementen por parte del desarrollador:

* Clonar el repositorio
```bash
git clone https://git.msp.gob.ec/microservicios/proyectos/taps/backend-api-taps.git
```

* Instalación de dependencias
```bash
npm install
```

### Ejecución de la aplicación
Luego de instalar las dependencias se puede ejecutar la aplicación con los siguientes comandos:

```bash
# modo desarrollo (pendiente de los cambios)
npm run start:dev

# modo producción (construcción y ejecución de la aplicación)
npm run build
npm run start:prod


### Ejecución de pruebas
Las pruebas unitarias y de coverage pueden ser implementadas con los siguientes comandos:

```bash
# Pruebas unitarias 
npm run test

# Pruebas de cobertura
npm run test:cov
```

### Manuales para el despliegue en los diferentes ambientes: 
* Manual de Instalación para el Ambiente de Desarrollo
* Manual de Instalación para el Ambiente de Pruebas
* Manual de Instalación para el Ambiente de Producción

## Otros documentos

* Creación de un nuevo proyecto en NestJS [[Wiki]](https://git.msp.gob.ec/microservicios/proyectos/plantillas/backend-api-base/-/wikis/Manual-t%C3%A9cnico-para-la-creaci%C3%B3n-de-un-nuevo-proyecto-en-NestJS)
