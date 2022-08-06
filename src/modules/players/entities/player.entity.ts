import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

export enum Devise {
  EUR = '€',
  USD = '$',
  FR = 'Fr',
  MAD = 'MAD',
}

@Schema({ timestamps: true })
export class Player {
  @Prop({
    required: true,
    type: String,
  })
  firstname: string;

  @Prop({
    required: true,
    type: String,
  })
  lastname: string;

  @Prop({
    required: true,
    type: Number,
  })
  goal: number;

  @Prop({
    required: true,
    type: Number,
  })
  salary: number;

  @Prop({
    required: true,
    enum: Object.values(Devise),
    type: String,
  })
  devise: Devise;

  @Prop({
    required: true,
    type: String,
  })
  pictureURl: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
