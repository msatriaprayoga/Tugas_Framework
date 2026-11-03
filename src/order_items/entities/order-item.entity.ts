import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { decimalTransformer } from '../../config/decimal.transformers.js';
import { Book } from '../../books/entities/book-entity.js';
import { Order } from '../../orders/entities/oders-entity.js';
import type { Relation } from "typeorm";

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: string;

  @Column({ type: 'int' })
  quantity: number;

  // Snapshot harga satuan saat transaksi (bukan selalu sama dengan books.price)
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: decimalTransformer,
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: decimalTransformer,
  })
  subtotal: number;

  // order_items (N) -> (1) orders
  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;

  // order_items (N) -> (1) books
  @ManyToOne(() => Book, (book) => book.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'book_id' })
  book: Relation<Book>;

}
