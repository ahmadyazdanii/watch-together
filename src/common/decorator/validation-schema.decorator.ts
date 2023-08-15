import { UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../pipe/validation.pipe';
import { Schema } from 'joi';

function ValidationSchema(schemas: Record<string, Schema>);
function ValidationSchema(schema: Schema);
function ValidationSchema(inputSchema: Schema | Record<string, Schema>) {
  return UsePipes(new JoiValidationPipe(inputSchema));
}

export { ValidationSchema };
