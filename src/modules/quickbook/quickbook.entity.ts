import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Quickbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ nullable: true })
  title!: string;
  
}
