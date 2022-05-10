import { registerAs } from '@nestjs/config';
import { KeycloakConnectOptions } from 'nest-keycloak-connect';

function keycloakConnectOptions(): KeycloakConnectOptions {
  return {
    authServerUrl: process.env.KC_AUTHSERVERURL,
    realm: process.env.KC_REALM,
    clientId: process.env.KC_CLIENTID,
    secret: process.env.KC_SECRET,
    bearerOnly: true,
    'ssl-required': 'external',
    'confidential-port': 0,
    useNestLogger: true,
    // policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
    // tokenValidation: TokenValidation.ONLINE, // optional
  };
}

export default registerAs('keycloak', () => ({
  config: keycloakConnectOptions(),
}));
