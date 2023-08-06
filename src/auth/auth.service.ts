import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';

@Injectable()
export class AuthService {
  constructor(private readonly database: DatabaseProvider) {}
}
