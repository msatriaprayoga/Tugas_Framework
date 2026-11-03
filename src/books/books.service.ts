import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Relasi yang ikut dimuat saat menampilkan buku
  private readonly relations = {
    category: true,
    publisher: true,
    bookAuthors: { author: true },
  };

  // Menampilkan semua buku
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: this.relations });
  }

  // Menambahkan buku baru
  async create(book: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create({
      title: book.title,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
      isAvailable: book.isAvailable ?? true,
      price: book.price,
      stock: book.stock,
      categoryId: book.categoryId,
      publisherId: book.publisherId ?? null,
      // satu baris book_authors per penulis (bookId diisi otomatis lewat cascade)
      bookAuthors: book.authorIds?.map((authorId) => ({ authorId })),
    });

    return this.bookRepository.save(newBook);
  }

  // Mencari buku berdasarkan ID
  async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: String(id) },
      relations: this.relations,
    });

    if (!book) {
      throw new NotFoundException(`Buku dengan ID ${id} tidak ditemukan`);
    }

    return book;
  }

  // Mengubah data buku (daftar penulis belum diubah lewat endpoint ini)
  async update(
    id: string,
    updatedBook: CreateBookDto,
  ): Promise<Book> {
    const book = await this.findById(id);

    const { authorIds, price, publisherId, ...rest } = updatedBook;
    Object.assign(book, rest, {
      price,
      publisherId: publisherId ?? null,
    });

    return this.bookRepository.save(book);
  }

  // Menghapus buku (soft delete: mengisi kolom deleted_at)
  async remove(id: string): Promise<{ message: string }> {
    const book = await this.findById(id);

    await this.bookRepository.softRemove(book);

    return { message: `Buku dengan ID ${id} berhasil dihapus` };
  }
}
