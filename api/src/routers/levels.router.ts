import { Router } from "express";
import * as levelsController from "../controllers/levels.controller.ts";


export const router = Router();

router.post("/levels", levelsController.createLevel);
router.get("/levels", levelsController.getLevels);
router.get("/levels/:id", levelsController.getLevelById);
router.patch("/levels/:id", levelsController.updateLevel);
router.delete("/levels/:id", levelsController.deleteLevel);