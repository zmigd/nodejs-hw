import { Router } from 'express';
import { getNoteById, getAllNotes , createNote, deleteNote, updateNote, main} from '../controllers/notesController.js';

const router = Router();


router.get('/', main);
router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', deleteNote);
router.patch('/notes/:noteId', updateNote);

export default router;
