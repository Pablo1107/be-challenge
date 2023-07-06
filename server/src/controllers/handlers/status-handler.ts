import { AppComponents } from '../../app/types';
import { Request, Response } from "express";

export async function statusHandler(components: AppComponents, req: Request, res: Response) {
  res.send({ ok: true })
}
