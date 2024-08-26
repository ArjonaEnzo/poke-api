import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonSeederService } from './pokemon-seeder.service';
import { BattleController } from './battle.controller';
import { BattleResult } from './entities/battle-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, BattleResult])],
  controllers: [PokemonController, BattleController],
  providers: [PokemonService, PokemonSeederService],
  exports: [PokemonService],
})
export class PokemonModule {}
