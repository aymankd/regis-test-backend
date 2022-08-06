import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/module/base.controller';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player, PlayerDocument } from './entities/player.entity';
import { PlayersService } from './players.service';
import { PlayersRepository } from './repositories/players.repository';

@Controller('players')
export class PlayersController extends BaseController<
  Player,
  PlayerDocument,
  CreatePlayerDto,
  UpdatePlayerDto,
  PlayersRepository,
  PlayersService
> {
  constructor(readonly playersService: PlayersService) {
    super(playersService);
  }
}
