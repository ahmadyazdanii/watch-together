import * as Joi from 'joi';
import { CreateHallDTO } from '../dto/create-hall.dto';
import { movieUrlSchema } from './common.schema';

export const createHallSchema = Joi.object<CreateHallDTO>({
  movie_url: movieUrlSchema,
}).options({ presence: 'required' });
