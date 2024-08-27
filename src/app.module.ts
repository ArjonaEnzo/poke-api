import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_DATABASE || 'pokemon.db',
      autoLoadEntities: true,
      synchronize: process.env.TYPEORM_SYNC === 'true', // Controlar sincronización con variable de entorno
      migrations: [__dirname + '/migration/**/*.js'],
      migrationsRun: true,
    }),
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
