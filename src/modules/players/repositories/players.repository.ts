import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/module/base.repository';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Player, PlayerDocument } from '../entities/player.entity';

@Injectable()
export class PlayersRepository extends BaseRepository<
  Player,
  PlayerDocument,
  CreatePlayerDto,
  UpdatePlayerDto
> {
  constructor(
    @InjectModel(Player.name, 'default')
    playerModel: Model<PlayerDocument>,
  ) {
    super(playerModel);
  }
}
