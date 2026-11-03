import { IsNotEmpty, IsUUID } from "class-validator";


export class CreateBookAuthorDto {
    @IsNotEmpty({ message: "ID buku tidak boleh kosong" })
    @IsUUID("all", { message: "ID buku harus berupa UUID" })
    readonly bookId: string;

    @IsNotEmpty({ message: "ID penulis tidak boleh kosong" })
    @IsUUID("all", { message: "ID penulis harus berupa UUID" })
    readonly authorId: string;
}
