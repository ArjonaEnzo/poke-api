import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService.findOne(id);
  }

  @Post()
  create(@Body() pokemon: Pokemon): Promise<Pokemon> {
    return this.pokemonService.create(pokemon);
  }
}
