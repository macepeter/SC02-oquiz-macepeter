import { Router } from "express";
import * as levelsController from "../controllers/levels.controller.ts";

export const router = Router();

// Récupérer tous les levels
router.get("/levels", levelsController.getAllLevels);

// Récupérer un level par son identifiant
router.get("/levels/:id", levelsController.getLevelById);

// Créer un level
router.post("/levels", levelsController.createLevel);

// Modifier un level
router.patch("/levels/:id", levelsController.updateLevel);

// Supprimer un level
router.delete("/levels/:id", levelsController.deleteLevel);