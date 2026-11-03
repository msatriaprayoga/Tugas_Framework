import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString({ message: 'Nama harus berupa teks' })
  @MaxLength(150, { message: 'Nama maksimal 150 karakter' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(150, { message: 'Email maksimal 150 karakter' })
  readonly email: string;

  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @IsString({ message: 'Nomor telepon harus berupa teks' })
  @MaxLength(20, { message: 'Nomor telepon maksimal 20 karakter' })
  readonly phone: string;
}
