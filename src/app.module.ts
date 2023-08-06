import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HallsModule } from './halls/halls.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    HallsModule,
  ],
})
export class AppModule {}
