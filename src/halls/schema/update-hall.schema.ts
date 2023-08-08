import * as Joi from 'joi';
import { UpdateHallDTO } from '../dto/update-hall.dto';
import { movieUrlSchema } from './common.schema';

export const updateHallSchema = Joi.object<UpdateHallDTO>({
  movie_url: movieUrlSchema,
});
