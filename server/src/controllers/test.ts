import { Request, Response } from 'express';

export const testController = {
  test: async (req: Request, res: Response) => {
    console.log('incredible');
  },
};
