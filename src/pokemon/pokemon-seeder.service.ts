import { Injectable, OnModuleInit } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import * as fs from 'fs';
import * as path from 'path';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonSeederService implements OnModuleInit {
  constructor(private readonly pokemonService: PokemonService) {}

  async onModuleInit() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'pokemon.json');

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { pokemon } = JSON.parse(fileContent);

      for (const p of pokemon) {
        const existingPokemon = await this.pokemonService.findOne(p.id);
        if (!existingPokemon) {
          const newPokemon = new Pokemon();
          newPokemon.id = p.id;
          newPokemon.name = p.name;
          newPokemon.attack = p.attack;
          newPokemon.defense = p.defense;
          newPokemon.hp = p.hp;
          newPokemon.speed = p.speed;
          newPokemon.type = p.type;
          newPokemon.imageUrl = p.imageUrl;

          await this.pokemonService.create(newPokemon);
        }
      }
    } catch (error) {
      console.error('Error reading pokemon.json file:', error);
    }
  }
}
