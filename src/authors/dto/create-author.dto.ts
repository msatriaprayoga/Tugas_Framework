import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Nama penulis tidak boleh kosong' })
  @IsString({ message: 'Nama penulis harus berupa teks' })
  @MaxLength(150, { message: 'Nama penulis maksimal 150 karakter' })
  readonly name: string;
}
