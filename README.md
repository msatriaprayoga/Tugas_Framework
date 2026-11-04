# BookStore E-Commerce: Database Relasional

| | |
|---|---|
| **Nama** | Muhammad Satria Prayoga |
| **NIM** | 24090108 |
| **Mata Kuliah** | Framework Programming |

Perancangan database relasional untuk aplikasi toko buku online (BookStore)
yang memenuhi prinsip normalisasi, menjaga integritas data, dan
diimplementasikan menggunakan NestJS dan TypeORM.

## Teknologi

- NestJS
- TypeORM
- PostgreSQL 16 (Docker)
- DBeaver (untuk melihat database dan ERD)

## Cara Menjalankan

1. Clone repository dan install dependency:
   ```bash
   git clone <url-repository>
   cd <nama-folder-project>
   npm install
   ```
2. Buat file `.env` di root project:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=root
   DB_PASSWORD=secret
   DB_DATABASE=bookstore
   ```
3. Jalankan PostgreSQL dengan Docker (pastikan Docker Desktop sudah berjalan):
   ```bash
   docker compose up -d
   ```
   Isi `docker-compose.yml`:
   ```yaml
   services:
     postgres-db:
       image: postgres:16-alpine
       container_name: harkat_postgres
       restart: always
       environment:
         POSTGRES_USER: root
         POSTGRES_PASSWORD: secret
         POSTGRES_DB: bookstore
       ports:
         - "5432:5432"
       volumes:
         - postgres_data_volume:/var/lib/postgresql/data

   volumes:
     postgres_data_volume:
   ```
4. Jalankan aplikasi:
   ```bash
   npm run start:dev
   ```
   Tabel dibuat otomatis oleh TypeORM.
5. Buka database di DBeaver (host `localhost`, port `5432`, database
   `bookstore`, user `root`, password `secret`), lalu cek 11 tabel di
   `bookstore` → `Schemas` → `public` → `Tables`.

## Daftar Tabel

| No | Tabel | Fungsi |
|---|---|---|
| 1 | `customers` | Menyimpan data pelanggan |
| 2 | `customer_addresses` | Menyimpan alamat pelanggan |
| 3 | `categories` | Menyimpan kategori buku |
| 4 | `publishers` | Menyimpan data penerbit |
| 5 | `books` | Menyimpan informasi buku |
| 6 | `authors` | Menyimpan data penulis |
| 7 | `book_authors` | Menghubungkan buku dan penulis |
| 8 | `orders` | Menyimpan transaksi pesanan |
| 9 | `order_items` | Menyimpan detail buku dalam pesanan |
| 10 | `payments` | Menyimpan informasi pembayaran |
| 11 | `shipments` | Menyimpan informasi pengiriman |

## ERD

ERD di bawah ini dihasilkan dari DBeaver (database `bookstore`, schema `public`).

![ERD BookStore](docs/erd.png)

## Ringkasan Relasi

| Parent | Child | Relasi |
|---|---|---|
| customers | customer_addresses | One-to-Many |
| customers | orders | One-to-Many |
| categories | books | One-to-Many |
| publishers | books | One-to-Many |
| books | authors | Many-to-Many (lewat `book_authors`) |
| orders | order_items | One-to-Many |
| books | order_items | One-to-Many |
| orders | payments | One-to-One |
| orders | shipments | One-to-One |

## Penjelasan Desain

- **Penulis dipisah ke tabel sendiri.** Tabel `books` tidak menyimpan nama
  penulis. Relasi buku dan penulis dikelola lewat `authors` dan `book_authors`
  (many-to-many) agar tidak ada redundansi dan satu buku bisa punya banyak
  penulis.
- **Kategori dan penerbit** dihubungkan lewat `category_id` dan `publisher_id`
  di tabel `books` (one-to-many).
- **Harga disimpan di `order_items`.** Kolom `price` pada `order_items` adalah
  snapshot harga saat transaksi, sehingga riwayat pesanan tidak berubah
  ketika harga buku di `books` diubah.
- **Alamat pengiriman disimpan di `orders`.** Kolom `shipping_*` menyimpan
  alamat saat checkout, sehingga perubahan alamat pelanggan tidak mengubah
  pesanan lama.
- **Pembayaran dan pengiriman** dipisah ke tabel `payments` dan `shipments`
  yang masing-masing terhubung ke `orders` lewat `order_id`.
- **Soft delete** memakai kolom `deleted_at` pada `customers` dan `books`.