import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'mongoose';
import Logging from '../library/Logging';
import { IAuthor } from '../models/Author';
import { IBook } from '../models/Book';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            title: Joi.string().required(),
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        }),
        update: Joi.object<IBook>({
            title: Joi.string().required(),
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        })
    }
};
