import { ArrayUnique, IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsUUID, MaxLength, Min } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({message: "Judul tidak boleh kosong"})
    @MaxLength(30, {message: "Judul maksimal 30 karakter"})
    readonly title: string;

    @IsNotEmpty({message: "ISBN tidak boleh kosong"})
    @MaxLength(45, {message: "ISBN maksimal 45 karakter"})
    readonly isbn: string;

    @IsNotEmpty({message: "Tahun terbit tidak boleh kosong"})
    @IsInt({message: "Tahun terbit harus berupa angka"})
    @Min(0, {message: "Tahun terbit tidak boleh negatif"})
    readonly publishedYear: number;

    @IsOptional()
    @IsBoolean({message: "Status ketersediaan harus berupa true atau false"})
    readonly isAvailable?: boolean;

    @IsNotEmpty({message: "Harga tidak boleh kosong"})
    @IsNumber({maxDecimalPlaces: 2}, {message: "Harga harus berupa angka dengan maksimal 2 desimal"})
    @Min(0, {message: "Harga tidak boleh negatif"})
    readonly price: number;

    @IsNotEmpty({message: "Stok tidak boleh kosong"})
    @IsInt({message: "Stok harus berupa angka bulat"})
    @Min(0, {message: "Stok tidak boleh negatif"})
    readonly stock: number;

    @IsNotEmpty({message: "Kategori tidak boleh kosong"})
    @IsUUID("all", {message: "ID kategori harus berupa UUID"})
    readonly categoryId: string;

    @IsOptional()
    @IsUUID("all", {message: "ID penerbit harus berupa UUID"})
    readonly publisherId?: string;

    // Daftar penulis; service akan mengisi tabel book_authors
    @IsOptional()
    @IsArray({message: "Daftar penulis harus berupa array"})
    @ArrayUnique({message: "Penulis tidak boleh duplikat"})
    @IsUUID("all", {each: true, message: "ID penulis harus berupa UUID"})
    readonly authorIds?: string[];
}