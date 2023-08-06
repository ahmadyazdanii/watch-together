import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';

@Injectable()
export class HallsService {
  constructor(private readonly database: DatabaseProvider) {}
}
