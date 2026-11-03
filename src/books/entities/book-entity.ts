import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { decimalTransformer } from "../../config/decimal.transformers.js";
import { Category } from "../../categories/entities/categories-entity.js";
import { Publisher } from "../../publishers/entities/publishers-entity.js";
import { BookAuthor } from "../../book_authors/entities/book_authors-entity.js";
import { OrderItem } from "../../order_items/entities/order-item.entity.js";

@Entity({name: 'books'})
export class Book{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 30})
    title: string;

    @Column({type: 'varchar', length: 45, unique: true})
    isbn: string;

    @Column({type: 'int', default:0})
    publishedYear: number;

    @Column({type:'boolean', default: true})
    isAvailable: boolean;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, transformer: decimalTransformer })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ name: 'category_id', type: 'uuid' })
    categoryId: string;

    @Column({ name: 'publisher_id', type: 'uuid', nullable: true })
    publisherId: string | null;

    // books (N) -> (1) categories
    @ManyToOne(() => Category, (category) => category.books, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'category_id' })
    category: Relation<Category>;

    // books (N) -> (1) publishers
    @ManyToOne(() => Publisher, (publisher) => publisher.books, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'publisher_id' })
    publisher: Relation<Publisher> | null;

    // books (N) <-> (N) authors, lewat book_authors
    @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.book, { cascade: ['insert'] })
    bookAuthors: BookAuthor[];

    // books (1) -> (N) order_items
    @OneToMany(() => OrderItem, (item) => item.book)
    orderItems: OrderItem[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', nullable: true})
    deletedAt: Date | null;

}