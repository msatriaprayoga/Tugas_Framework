import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsUUID, MaxLength} from "class-validator";
import { ShipmentStatus } from '../../config/enum.js';

export class CreateShipmentDto {
    @IsNotEmpty({ message: "ID pesanan tidak boleh kosong" })
    @IsUUID("all", { message: "ID pesanan harus berupa UUID" })
    readonly orderId: string;

    @IsNotEmpty({ message: "Kurir tidak boleh kosong" })
    @MaxLength(100, { message: "Nama kurir maksimal 100 karakter" })
    readonly courier: string;

    @IsOptional()
    @MaxLength(100, { message: "Nomor resi maksimal 100 karakter" })
    readonly trackingNumber?: string;

    @IsOptional()
    @IsEnum(ShipmentStatus, { message: "Status pengiriman tidak valid" })
    readonly status?: ShipmentStatus;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: "Waktu pengiriman harus berupa tanggal yang valid" })
    readonly shippedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: "Waktu diterima harus berupa tanggal yang valid" })
    readonly deliveredAt?: Date;
}
