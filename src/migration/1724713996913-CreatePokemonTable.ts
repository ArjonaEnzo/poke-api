import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePokemonTable1724713996913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pokemon (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        attack INT NOT NULL,
        defense INT NOT NULL,
        hp INT NOT NULL,
        speed INT NOT NULL,
        type VARCHAR,
        imageUrl VARCHAR
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pokemon`);
  }
}
