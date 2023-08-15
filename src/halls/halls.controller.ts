import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { HallsService } from './halls.service';
import { CreateHallDTO } from './dto/create-hall.dto';
import { ValidationSchema } from '@common/decorator/validation-schema.decorator';
import { createHallSchema } from './schema/create-hall.schema';
import { updateHallSchema } from './schema/update-hall.schema';
import { UpdateHallDTO } from './dto/update-hall.dto';
import { CurrentUser } from '@common/decorator/current-user.decorator';

@Controller('halls')
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  @Get('/')
  getHalls(@CurrentUser('id') user_id: string) {
    return this.hallsService.getHalls(user_id);
  }

  @Post('/')
  @ValidationSchema(createHallSchema)
  createHall(
    @Body() { movie_url }: CreateHallDTO,
    @CurrentUser('id') user_id: string,
  ) {
    return this.hallsService.createHall(movie_url, user_id);
  }

  @Put('/:hall_id')
  @ValidationSchema(updateHallSchema)
  updateHall(
    @Param(
      'hall_id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    hall_id: number,
    @Body() updatableHallData: UpdateHallDTO,
  ) {
    return this.hallsService.updateHall(hall_id, updatableHallData);
  }

  @Delete('/:hall_id')
  removeHall(
    @Param(
      'hall_id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    hall_id: number,
  ) {
    return this.hallsService.removeHall(hall_id);
  }
}
