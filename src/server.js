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


router.get('/', (req, res) => {
  res.status(200).json({ message: '03-validation' });
});


router.get('/notes', getAllNotesSchema, getAllNotes);
router.get('/notes/:noteId', noteIdSchema, getNoteById);
router.post('/notes', createNoteSchema, createNote);
router.patch('/notes/:noteId', updateNoteSchema, updateNote);
router.delete('/notes/:noteId', noteIdSchema, deleteNote);

export default router;
