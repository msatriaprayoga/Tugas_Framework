import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    MaxLength,
    ValidateNested,
} from "class-validator";
import { OrderStatus } from '../../config/enum.js';
import { OrderItemInputDto } from "../../order_items/dto/order-item.dto.js";

// orderNumber, status awal (pending), dan totalAmount diatur oleh service
export class CreateOrderDto {
    @IsNotEmpty({ message: "ID pelanggan tidak boleh kosong" })
    @IsUUID("all", { message: "ID pelanggan harus berupa UUID" })
    readonly customerId: string;

    @IsArray({ message: "Item pesanan harus berupa array" })
    @ArrayMinSize(1, { message: "Pesanan minimal berisi 1 buku" })
    @ValidateNested({ each: true })
    @Type(() => OrderItemInputDto)
    readonly items: OrderItemInputDto[];

    // Snapshot alamat pengiriman (bisa disalin dari customer_addresses saat checkout)
    @IsNotEmpty({ message: "Nama penerima tidak boleh kosong" })
    @MaxLength(150, { message: "Nama penerima maksimal 150 karakter" })
    readonly shippingRecipientName: string;

    @IsNotEmpty({ message: "Nomor telepon penerima tidak boleh kosong" })
    @MaxLength(20, { message: "Nomor telepon penerima maksimal 20 karakter" })
    readonly shippingPhone: string;

    @IsNotEmpty({ message: "Alamat pengiriman tidak boleh kosong" })
    readonly shippingAddress: string;

    @IsNotEmpty({ message: "Kota tidak boleh kosong" })
    @MaxLength(100, { message: "Kota maksimal 100 karakter" })
    readonly shippingCity: string;

    @IsNotEmpty({ message: "Kode pos tidak boleh kosong" })
    @MaxLength(10, { message: "Kode pos maksimal 10 karakter" })
    readonly shippingPostalCode: string;
}