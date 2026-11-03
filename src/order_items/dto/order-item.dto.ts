import { IsInt, IsNotEmpty, IsUUID, Min } from "class-validator";


export class OrderItemInputDto {
    @IsNotEmpty({ message: "ID buku tidak boleh kosong" })
    @IsUUID("all", { message: "ID buku harus berupa UUID" })
    readonly bookId: string;

    @IsNotEmpty({ message: "Jumlah tidak boleh kosong" })
    @IsInt({ message: "Jumlah harus berupa angka bulat" })
    @Min(1, { message: "Jumlah minimal 1" })
    readonly quantity: number;
}

export class CreateOrderItemDto extends OrderItemInputDto {
    @IsNotEmpty({ message: "ID pesanan tidak boleh kosong" })
    @IsUUID("all", { message: "ID pesanan harus berupa UUID" })
    readonly orderId: string;
}