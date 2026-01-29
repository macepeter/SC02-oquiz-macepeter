import type { Request, Response } from "express";
import { prisma } from "../models/index.ts";
import * as z from "zod"; 


export async function getAllLevels(req: Request, res: Response) {
  try {

    // Récupérer tous les levels
    const levels:Array<object> = await prisma.level.findMany();

    // On les retourne en réponse
    res.status(200).json(levels);

  } catch (error) {res.status(500).json({error});}
}

export async function getLevelById(req: Request, res: Response) {
  try {

    const levelId:number = Number(req.params.id);

    const level:object | null = await prisma.level.findUnique({ where: { id: levelId } });

    if(level === null) { res.status(404).json({error: "No level found"}); }

    res.status(200).json(level);
  } catch (error) {
    res.status(500).json({error});
  }
}

export async function createLevel(req: Request, res: Response) {

  try {

    const LevelSchema = z.object({ 
      name: z.string().min(1)
    });

    const {data} = await LevelSchema.safeParseAsync(req.body);

    const createdLevel = await prisma.level.create({ data });

    res.status(200).json(createdLevel);

  } catch (error) {

    if (error.code === "P2002") {
      return res.status(409).json({ error: "Level already exists" });
    }
    res.status(500).json({error});
  }

}

export async function updateLevel(req: Request, res: Response) {
  try {

    const levelId:number = Number(req.params.id);

    const levelName:string = req.body.name;

    const updatedLevel = await prisma.level.update({
      where: { id: levelId },
      data: { name: levelName }
    });

    res.status(200).json(updatedLevel);
  } catch (error) {
    res.status(500).json({error});
  }
}

export async function deleteLevel(req: Request, res: Response) {
  try {

    const levelId:number = Number(req.params.id);

    const deletedLevel = await prisma.level.delete({ where: {id: levelId} });

    res.status(200).json(deletedLevel);

  } catch (error) {
    res.status(500).json({error});
  }
}