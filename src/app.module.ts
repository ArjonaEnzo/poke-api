// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'pokemon.db',
      autoLoadEntities: true,
      synchronize: false, // true solo en desarrollo
      migrations: [__dirname + '/migration/**/*.js'], // Ruta para las migraciones compiladas
      migrationsRun: true, // Ejecuta migraciones automáticamente al iniciar la aplicación
    }),
    PokemonModule, // El módulo principal que maneja todo lo relacionado con Pokémon
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
