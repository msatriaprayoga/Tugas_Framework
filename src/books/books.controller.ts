import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) {}

    @Get()
    getBooks() {
        return this.bookService.findAll();
    }

    @Post()
    createBook(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get(':id')
    getBookById(@Param('id') id: string) {
        return this.bookService.findById(id);
    }

    @Put(':id')
    updateBook(@Param('id') id: string, @Body() updatedBook: CreateBookDto) {
        return this.bookService.update(id, updatedBook);
    }

    @Patch(':id')
    partiallyUpdateBook(@Param('id') id: string) {
        return `Data buku berhasil diperbarui sebagian berdasarkan ID: ${id}`;
    }

    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return this.bookService.remove(id);
    }
}
