import { Router } from "express";
import * as levelsController from "../controllers/levels.controller.ts";

export const router = Router();

router.post("/levels", levelsController.createLevel);