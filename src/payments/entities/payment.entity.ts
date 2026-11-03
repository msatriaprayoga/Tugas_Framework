import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { PaymentStatus } from '../../config/enum.js';
import { decimalTransformer } from '../../config/decimal.transformers.js';
import { Order } from '../../orders/entities/oders-entity.js';
import type { Relation } from "typeorm";

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // UNIQUE: satu pesanan hanya punya satu catatan pembayaran (rancangan sederhana).
  // Hapus `unique` + ubah relasi jadi ManyToOne bila ingin mendukung banyak percobaan bayar.
  @Column({ name: 'order_id', type: 'uuid', unique: true })
  orderId: string;

  @Column({ name: 'payment_method', type: 'varchar', length: 50 })
  paymentMethod: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: decimalTransformer,
  })
  amount: number;

  @Column({ type: 'varchar', length: 30, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;

  // payments (1) -> (1) orders
  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

}
