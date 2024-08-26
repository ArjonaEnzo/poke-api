import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class BattleResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pokemon1Id: string;

  @Column()
  pokemon2Id: string;

  @Column()
  winnerId: string;

  @CreateDateColumn()
  date: Date;
}
