import { IsNotEmpty, MaxLength } from "class-validator";

export class CreatePublisherDto {
    @IsNotEmpty({ message: "Nama penerbit tidak boleh kosong" })
    @MaxLength(150, { message: "Nama penerbit maksimal 150 karakter" })
    readonly name: string;
}