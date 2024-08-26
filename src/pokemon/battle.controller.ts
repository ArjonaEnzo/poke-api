// src/pokemon/battle.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BattleResult } from './entities/battle-result.entity';
import { Pokemon } from './entities/pokemon.entity';

@Controller('battle')
export class BattleController {
  constructor(
    private readonly pokemonService: PokemonService,
    @InjectRepository(BattleResult)
    private readonly battleResultRepository: Repository<BattleResult>,
  ) {}

  @Post()
  async battle(@Body() body: { pokemon1Id: string; pokemon2Id: string }) {
    const { pokemon1Id, pokemon2Id } = body;

    // Obtener los datos de los Pokémon seleccionados por sus IDs
    const pokemon1 = await this.pokemonService.findOne(pokemon1Id);
    const pokemon2 = await this.pokemonService.findOne(pokemon2Id);

    if (!pokemon1 || !pokemon2) {
      throw new HttpException(
        'Invalid Pokémon IDs provided.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let attacker: Pokemon, defender: Pokemon;

    // Determinar quién ataca primero
    if (
      pokemon1.speed > pokemon2.speed ||
      (pokemon1.speed === pokemon2.speed && pokemon1.attack > pokemon2.attack)
    ) {
      attacker = pokemon1;
      defender = pokemon2;
    } else {
      attacker = pokemon2;
      defender = pokemon1;
    }

    // Realizar la batalla por turnos
    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      const damage = Math.max(attacker.attack - defender.defense, 1);
      defender.hp -= damage;

      if (defender.hp <= 0) {
        break;
      }

      // Cambiar roles entre atacante y defensor
      [attacker, defender] = [defender, attacker];
    }

    const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;

    // Guardar el resultado en la base de datos
    const battleResult = this.battleResultRepository.create({
      pokemon1Id: pokemon1.id,
      pokemon2Id: pokemon2.id,
      winnerId: winner.id,
    });
    await this.battleResultRepository.save(battleResult);

    return {
      winner: winner.name,
      pokemon1: { name: pokemon1.name, remainingHp: pokemon1.hp },
      pokemon2: { name: pokemon2.name, remainingHp: pokemon2.hp },
    };
  }

  // Método para obtener el historial de batallas
  @Get('/history')
  async findAllBattleResults() {
    return await this.battleResultRepository.find(); // Retorna todos los resultados de batallas
  }
}
