import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({message: "Username tidak boleh kosong"})
    @MaxLength(30, {message: "Username maksimal 30 karakter"})
    readonly username: string;

    @IsNotEmpty({message: "Email tidak boleh kosong"})
    @IsEmail({}, {message: "Email tidak valid"})
    readonly email: string;

    @IsNotEmpty({message: "Password tidak boleh kosong"})
    @MinLength(3, {message: "Password minimal 3 karakter"})
    @MaxLength(16, {message: "Password maksimal 16 karakter"})
    readonly password: string;

    @IsNotEmpty({message: "Konfirmasi password tidak boleh kosong"})
    @MinLength(3, {message: "Konfirmasi password minimal 3 karakter"})
    @MaxLength(16, {message: "Konfirmasi password maksimal 16 karakter"})
    readonly confirmPassword: string;
}