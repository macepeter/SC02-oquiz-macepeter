import type { Request, Response } from "express";
import { prisma } from "../models/index.ts";
import * as z from "zod"; 


export async function createLevel(req: Request, res: Response) {

  try {

    const LevelSchema = z.object({ 
      name: z.string().min(1)
    });

    const {data, error} = await LevelSchema.safeParseAsync(req.body)

    const createdLevel = await prisma.level.create({ data })

    res.status(200).json(req.body)

  } catch (error) {
    res.status(500).json(error)
  }

}

export async function getLevels(req: Request, res: Response) {
  try {
    const LevelSchema = z.object({ 
      name: z.string().min(1)
    });
    const {data, error} = await LevelSchema.safeParseAsync(req.body)
    const levels = await prisma.level.findMany();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json(error);
  }
}