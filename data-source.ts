import { DataSource } from 'typeorm';
import { Pokemon } from './src/pokemon/entities/pokemon.entity';
import { CreatePokemonTable1724713996913 } from './src/migration/1724713996913-CreatePokemonTable';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'pokemon.db',
  entities: [Pokemon],
  migrations: [CreatePokemonTable1724713996913],
  synchronize: false,
});
