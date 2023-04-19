import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { User } from '../entities/User';

interface schemeReg {
  name: string;
  email: string;
  password: string;
}

interface schemeLogin {
  email: string;
  password: string;
}

export class authHandlers {
  async register(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const userRepository = AppDataSource.getRepository(User);

    const { name, email, password } = request.payload as schemeReg;

    // Проверка на наличие пользователя с таким email
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      return Boom.conflict('Пользователь с таким email уже зарегистрирован');
    }

    // Создание пользователя
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = await bcrypt.hash(password, 10);

    // Сохранение пользователя в БД
    await userRepository.manager.save(newUser);

    return h.response({ message: 'Пользователь успешно зарегистрирован' }).code(201);
  }

  login = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const userRepository = AppDataSource.getRepository(User);

    const { email, password } = request.payload as schemeLogin;

    // Проверка на наличие пользователя с таким email
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return Boom.unauthorized('Пользователь с таким email не найден');
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return Boom.unauthorized('Неверный пароль');
    }

    // Создание токена
    const token = jwt.sign({ id: user.id }, 'mysecret', { expiresIn: '1h' });

    return h.response({
      token,
      message: 'Авторизация успешна',
    });
  };

  // export const validateToken = async (decoded: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  //   const userRepository = AppDataSource.getRepository(User);

  //   // Проверка на наличие пользователя с таким id
  //   const user = await userRepository.findOne({ where: { id: decoded.id } });
  //   if (!user) {
  //     return { isValid: false };
  //   }

  //   return { isValid: true };
  // };
}
