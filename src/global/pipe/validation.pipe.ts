import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
  ArgumentMetadata,
  Type,
} from '@nestjs/common';
import { Schema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schemaInput: Schema | Record<string, Schema>) {}

  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (!value) {
      throw new UnprocessableEntityException('Required field(s) not provided');
    }

    const schema: Schema = Object.getOwnPropertyNames(
      this.schemaInput,
    ).includes(metatype.name)
      ? this.schemaInput[metatype.name]
      : this.schemaInput;

    const validationResult = schema.validate(value, {
      abortEarly: true,
    });

    if (validationResult.error) {
      throw new UnprocessableEntityException(validationResult.error.message);
    }

    return validationResult.value;
  }

  private toValidate(metatype: Type): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
