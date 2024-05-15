import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw Error('Es necesario token de autenticacion');

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) throw Error('Usuario no encontrado');

    req.user = user.id;

    next();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
