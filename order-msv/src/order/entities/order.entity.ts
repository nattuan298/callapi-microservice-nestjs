import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('json', { nullable: false })
  productId: string[];

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  userId: string;
}
