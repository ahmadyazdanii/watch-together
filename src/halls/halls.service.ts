import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';
import { UpdateHallDTO } from './dto/update-hall.dto';
import { map } from 'lodash';

@Injectable()
export class HallsService {
  constructor(private readonly database: DatabaseProvider) {}

  async getHall(id: number) {
    const hall = await this.database.hall.findUnique({
      include: {
        members: {
          select: {
            role: true,
            member: {
              select: {
                id: true,
                full_name: true,
              },
            },
          },
        },
      },

      where: {
        id,
      },
    });

    return {
      ...hall,
      members: map(hall.members, (member) => {
        return { ...member.member, role: member.role };
      }),
    };
  }

  async getHalls(user_id: string) {
    return await this.database.hall.findMany({
      where: {
        members: {
          some: {
            member_id: user_id,
          },
        },
      },
    });
  }

  async createHall(movie_url: string, user_id: string) {
    return await this.database.hall.create({
      data: {
        movie_url,
        members: {
          create: {
            member_id: user_id,
            role: 'PROVIDER',
          },
        },
      },
    });
  }

  async updateHall(id: number, updatable_data: UpdateHallDTO) {
    return await this.database.hall.update({
      where: {
        id,
      },
      data: updatable_data,
    });
  }

  async removeHall(id: number) {
    return await this.database.hall.delete({
      where: {
        id,
      },
    });
  }
}
