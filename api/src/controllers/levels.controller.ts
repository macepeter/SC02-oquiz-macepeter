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

    res.status(200).json(createdLevel)

  } catch (error) {

    if (error.code === "P2002") {
      return res.status(409).json({ error: "Level already exists" });
    }
    res.status(500).json({error})
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

export async function getLevelById(req: Request, res: Response) {
  try {
    const levelId = Number(req.params.id);
    const level = await prisma.level.findUnique({
      where: { id: levelId },
    });

    if (!level) {
      return res.status(404).json({ message: "Level not found" });
    }

    res.status(200).json(level);
  } catch (error) {
    res.status(500).json(error);
  }
}


export async function updateLevel(req: Request, res: Response) {
  try {

    const levelId:number = Number(req.params.id)

    const levelName:string = req.body.name

    const updatedLevel = await prisma.level.update({
      where: { id: levelId },
      data: { name: levelName }
    })

    res.status(200).json(updatedLevel)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function deleteLevel(req: Request, res: Response) {
  try {

    const levelId:number = Number(req.params.id)

    const deletedLevel = await prisma.level.delete({ where: {id: levelId} })

    res.status(200).json(deletedLevel)

  } catch (error) {
    res.status(500).json({error})
  }
}