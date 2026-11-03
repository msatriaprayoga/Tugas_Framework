import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: "Nama kategori tidak boleh kosong" })
    @MaxLength(100, { message: "Nama kategori maksimal 100 karakter" })
    readonly name: string;
}
