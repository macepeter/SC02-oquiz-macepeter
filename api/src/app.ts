import cors from "cors";
import express from "express";
import { router as apiRouter } from "./routers/index.router.ts";
import { infoMiddleware } from "./middlewares/info.middleware.ts";

// Créer une app Express
export const app = express();

// Autorisation CORS
app.use(cors());

// Body parser pour récupérer les body "application/json" dans req.body
app.use(express.json());

// Brancher le routeur de l'API
app.use("/api", apiRouter);

// Info route
app.get("/info", infoMiddleware);
