import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "platforms" })
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}