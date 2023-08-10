import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseProvider extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger(DatabaseProvider.name);

  async onModuleInit() {
    await this.$connect();

    this.$on(
      'query' as never,
      (event: {
        timestamp: Date;
        query: string;
        params: string;
        duration: number;
        target: string;
      }) => {
        this.logger.debug(
          `the query "${event.query}" executed with ${event.params} params on ${event.duration} ms duration`,
        );
      },
    );
  }
}
