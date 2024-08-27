import { DataSource } from 'typeorm';
import { Pokemon } from './src/pokemon/entities/pokemon.entity';
import { CreatePokemonTable1724713996913 } from './src/migration/1724713996913-CreatePokemonTable';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_DATABASE || 'pokemon.db', // Usar variable de entorno para la base de datos
  entities: [Pokemon],
  migrations: [CreatePokemonTable1724713996913],
  synchronize: process.env.TYPEORM_SYNC === 'true', // Usar variable de entorno para sincronización
});
