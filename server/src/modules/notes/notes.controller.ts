// src/modules/notes/notes.controller.ts

import { Request, Response, NextFunction } from "express";
import notesService from "./notes.service";

class NotesController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const note = await notesService.createNote(req.body);

			return res.status(201).json({
				success: true,
				message: "Note created successfully",
				data: note,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(req: Request, res: Response, next: NextFunction) {
		try {
			const notes = await notesService.getNotes(req.query);

			return res.status(200).json({
				success: true,
				message: "Notes fetched successfully",
				data: notes,
			});
		} catch (error) {
			next(error);
		}
	}

	async countAll(req: Request, res: Response, next: NextFunction) {
		try {
			const total = await notesService.countAll(req.query);

			return res.status(200).json({
				success: true,
				message: "Notes counted successfully",
				data: {
					total,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const note = await notesService.getNoteById(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "Note fetched successfully",
				data: note,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const note = await notesService.updateNote(
				String(req.params.id),
				req.body
			);

			return res.status(200).json({
				success: true,
				message: "Note updated successfully",
				data: note,
			});
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await notesService.deleteNote(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "Note deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new NotesController();