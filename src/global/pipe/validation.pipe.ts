import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Schema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema) {}

  transform(value: any) {
    if (!value) {
      throw new UnprocessableEntityException('Required field(s) not provided');
    }

    const validationResult = this.schema.validate(value, {
      abortEarly: true,
    });

    if (validationResult.error) {
      throw new UnprocessableEntityException(validationResult.error.message);
    }

    return validationResult.value;
  }
}
