import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "games" })
export class Game {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: string;

  @Column({ default: 0 })
  rating: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  platform: string;

  @Column({ nullable: false })
  genre: string;

  @Column({ nullable: false })
  publisher: string;

  @Column({ nullable: false })
  releaseDate: string;

  @Column({ nullable: false })
  developer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}