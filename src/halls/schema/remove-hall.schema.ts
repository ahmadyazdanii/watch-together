import * as Joi from 'joi';
import { RemoveHallDTO } from '../dto/remove-hall.dto';

export const removeHallSchema = Joi.object<RemoveHallDTO>({
  id: Joi.string().trim().uuid({ version: 'uuidv4' }),
}).options({ presence: 'required' });
