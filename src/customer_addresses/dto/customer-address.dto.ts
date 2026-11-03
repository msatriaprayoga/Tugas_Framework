import { IsNotEmpty, IsUUID, MaxLength } from "class-validator";

export class CreateCustomerAddressDto {
    @IsNotEmpty({ message: "ID pelanggan tidak boleh kosong" })
    @IsUUID("all", { message: "ID pelanggan harus berupa UUID" })
    readonly customerId: string;

    @IsNotEmpty({ message: "Nama penerima tidak boleh kosong" })
    @MaxLength(150, { message: "Nama penerima maksimal 150 karakter" })
    readonly recipientName: string;

    @IsNotEmpty({ message: "Nomor telepon tidak boleh kosong" })
    @MaxLength(20, { message: "Nomor telepon maksimal 20 karakter" })
    readonly phone: string;

    @IsNotEmpty({ message: "Alamat tidak boleh kosong" })
    readonly address: string;

    @IsNotEmpty({ message: "Kota tidak boleh kosong" })
    @MaxLength(100, { message: "Kota maksimal 100 karakter" })
    readonly city: string;

    @IsNotEmpty({ message: "Kode pos tidak boleh kosong" })
    @MaxLength(10, { message: "Kode pos maksimal 10 karakter" })
    readonly postalCode: string;
}

