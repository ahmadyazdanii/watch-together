import { PartialType } from '@nestjs/mapped-types';
import { CreateHallDTO } from './create-hall.dto';

export class UpdateHallDTO extends PartialType(CreateHallDTO) {}
