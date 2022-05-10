/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2021-12-22 09:33:57
 * @ Modified by: Anthony Loyaga
 * @ Modified time: 2022-04-22 09:12:29
 */

export interface RespuestaKeycloak {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  acr: string;
  resource_access: any;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  fuente_datos?: string;
  cadena_farmacia?: string;
  family_name: string;
  email: string;
}
