import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';

const createJWT = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET!, { expiresIn: '3d' });
};

export const usersController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.query;
      if (!username || !password) throw Error('Falta usuario o contraseña');
      if (typeof username !== 'string' || typeof password !== 'string')
        throw Error('Error de longitud');

      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) throw Error('Nombre de usuario invalido');

      const passwordMatch = user.password === password; //TODO: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      if (!passwordMatch) throw Error('Invalid password');

      const token = createJWT(user.id.toString());

      res.status(200).send({
        token: token,
        id: user.id,
        name: user.username,
        permission: 'ADMIN',
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
