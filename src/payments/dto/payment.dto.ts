import { Type } from "class-transformer";
import {IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, MaxLength, Min} from "class-validator";
import { PaymentStatus } from '../../config/enum.js';

export class CreatePaymentDto {
    @IsNotEmpty({ message: "ID pesanan tidak boleh kosong" })
    @IsUUID("all", { message: "ID pesanan harus berupa UUID" })
    readonly orderId: string;

    @IsNotEmpty({ message: "Metode pembayaran tidak boleh kosong" })
    @MaxLength(50, { message: "Metode pembayaran maksimal 50 karakter" })
    readonly paymentMethod: string;

    @IsNotEmpty({ message: "Jumlah pembayaran tidak boleh kosong" })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Jumlah pembayaran harus berupa angka dengan maksimal 2 desimal" })
    @Min(0, { message: "Jumlah pembayaran tidak boleh negatif" })
    readonly amount: number;

    @IsOptional()
    @IsEnum(PaymentStatus, { message: "Status pembayaran tidak valid" })
    readonly status?: PaymentStatus;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: "Waktu pembayaran harus berupa tanggal yang valid" })
    readonly paidAt?: Date;
}
