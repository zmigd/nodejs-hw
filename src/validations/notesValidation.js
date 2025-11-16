
import { Joi, Segments, celebrate } from 'celebrate';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const getAllNotesSchema = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().allow('').optional(),
  }),
});

export const noteIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'any.invalid': 'Invalid note ID format',
      'any.required': 'Note ID is required',
    }),
  }),
});

export const createNoteSchema = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.min': 'Title must have at least 1 character',
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
    }),
    content: Joi.string().allow('').optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }),
});

export const updateNoteSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'any.invalid': 'Invalid note ID format',
      'any.required': 'Note ID is required',
    }),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional().messages({
      'string.min': 'Title must have at least 1 character',
      'string.empty': 'Title cannot be empty',
    }),
    content: Joi.string().allow('').optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }).min(1).messages({
    'object.min': 'At least one field (title, content, or tag) must be provided',
  }),
});
