import { UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../pipe/validation.pipe';
import { Schema } from 'joi';

export function ValidationSchema(schema: Schema) {
  return UsePipes(new JoiValidationPipe(schema));
}
