import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/module/base.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player, PlayerDocument } from './entities/player.entity';
import { PlayersRepository } from './repositories/players.repository';
@Injectable()
export class PlayersService extends BaseService<
  Player,
  PlayerDocument,
  CreatePlayerDto,
  UpdatePlayerDto,
  PlayersRepository
> {
  constructor(readonly playersRepository: PlayersRepository) {
    super(playersRepository);
  }
}
