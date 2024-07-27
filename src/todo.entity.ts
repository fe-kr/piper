import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("todo")
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") 
  id!: string;

  @CreateDateColumn() 
  createdAt!: Date;

  @UpdateDateColumn() 
  updatedAt!: Date;

  @Column({ type: "enum", enum: ["pending", "done"], default: "pending" }) 
  status: string = "pending";

  @Column()
  title!: string;
}
