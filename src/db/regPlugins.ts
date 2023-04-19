import * as HapiSwagger from 'hapi-swagger';
import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import jwt from '@hapi/jwt';

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Test API Documentation',
  },
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  {
    plugin: jwt,
  },
];

export default plugins;
