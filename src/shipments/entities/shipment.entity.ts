import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ShipmentStatus } from '../../config/enum.js';
import { Order } from '../../orders/entities/oders-entity.js';
import type { Relation } from "typeorm";

@Entity({ name: 'shipments' })
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // UNIQUE: satu pesanan maksimal satu pengiriman (rancangan sederhana)
  @Column({ name: 'order_id', type: 'uuid', unique: true })
  orderId: string;

  @Column({ type: 'varchar', length: 100 })
  courier: string;

  @Column({
    name: 'tracking_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  trackingNumber: string | null;

  @Column({ type: 'varchar', length: 30, default: ShipmentStatus.PENDING })
  status: ShipmentStatus;

  @Column({ name: 'shipped_at', type: 'timestamp', nullable: true })
  shippedAt: Date | null;

  @Column({ name: 'delivered_at', type: 'timestamp', nullable: true })
  deliveredAt: Date | null;

  // shipments (1) -> (1) orders
  @OneToOne(() => Order, (order) => order.shipment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;

}
