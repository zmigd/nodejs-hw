// src/routes/notesRoutes.js
import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/', getAllNotesSchema, getAllNotes);
router.get('/:noteId', noteIdSchema, getNoteById);
router.post('/', createNoteSchema, createNote);
router.patch('/:noteId', updateNoteSchema, updateNote);
router.delete('/:noteId', noteIdSchema, deleteNote);

export default router;
