import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { PrismaClientOptions } from '@prisma/client/runtime/library';

@Module({})
export class DatabaseModule {
  static forRoot(config: PrismaClientOptions): DynamicModule {
    return {
      module: DatabaseModule,
      global: true,
      providers: [
        {
          provide: DatabaseProvider,
          useFactory: () => {
            return new DatabaseProvider(config);
          },
        },
      ],
      exports: [DatabaseProvider],
    };
  }
}
