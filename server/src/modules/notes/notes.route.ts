// src/modules/notes/notes.route.ts

import { Router } from "express";
import notesController from "./notes.controller";

import validateMiddleware from "../../middlewares/validate.middleware";

import { createNoteSchema, updateNoteSchema, noteIdSchema, noteQuerySchema } from "./notes.validators";

const router = Router();

router.post("/", validateMiddleware(createNoteSchema), notesController.create);

router.get("/", validateMiddleware(noteQuerySchema), notesController.findAll);

router.get("/count", validateMiddleware(noteQuerySchema), notesController.countAll);

router.get("/:id", validateMiddleware(noteIdSchema), notesController.findById);

router.patch("/:id", validateMiddleware(updateNoteSchema), notesController.update);

router.delete("/:id", validateMiddleware(noteIdSchema), notesController.delete);

export default router;
