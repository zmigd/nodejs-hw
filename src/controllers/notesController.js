// src/controllers/notesController.js
import Note from '../models/note.js';
import createHttpError from 'http-errors';

export const main = async (req, res, next) => {
  res.status(200).json({ message: '03-validation' });
};


export const getAllNotes = async (req, res, next) => {
  try {

    const { page = 1, perPage = 10, tag, search } = req.query;


    const filter = {};

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage);


    const [notes, totalNotes] = await Promise.all([
      Note.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Note.countDocuments(filter),
    ]);


    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};


export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId });

    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};
