import { userRegistrationSchema } from '../schema/user';
import { userLoginSchema } from '../schema/user';
import { authHandlers } from '../auth/auth';
import Hapi from '@hapi/hapi';

const auth = new authHandlers();

export const routes: Hapi.ServerRoute<Hapi.ReqRefDefaults> | Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
  {
    method: 'POST',
    path: '/register',
    handler: auth.register,
    options: {
      description: 'Registration USER',
      notes: 'Reg',
      tags: ['api'],
      validate: {
        payload: userRegistrationSchema,
      },
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: auth.login,
    options: {
      description: 'Login USER',
      notes: 'Login',
      tags: ['api'],
      validate: {
        payload: userLoginSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'hello world';
    },
  },
];
