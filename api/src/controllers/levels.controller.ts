import type { Request, Response } from "express";
import { prisma } from "../models/index.ts";
import * as z from "zod"; 


export async function createLevel(req: Request, res: Response) {

  try {

    const { LevelSchema } = req.body
    
    const Level = z.object({ 
        name: z.string().min(1)
    });

    const {data, error} = await LevelSchema.safeParseAsync(req.body)
    const createdLevel = await prisma.level.create({ data })




  } catch (error) {
    res.status(500).json(error)
  }

    res.json(req.body)
}