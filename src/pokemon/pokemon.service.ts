import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  findOne(id: string): Promise<Pokemon> {
    return this.pokemonRepository.findOne({ where: { id } });
  }

  create(pokemon: Pokemon): Promise<Pokemon> {
    return this.pokemonRepository.save(pokemon);
  }

  async remove(id: string): Promise<void> {
    await this.pokemonRepository.delete(id);
  }
}
