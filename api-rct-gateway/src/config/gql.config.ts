import { registerAs } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';

function gqlModuleOptions(): GqlModuleOptions {
  return {
    autoSchemaFile: 'src/graphql/schema.gql',
    sortSchema: true,
    playground: true,
    buildSchemaOptions: {
      dateScalarMode: 'isoDate',
    },
  };
}

export default registerAs('gql', () => ({
  config: gqlModuleOptions(),
}));
