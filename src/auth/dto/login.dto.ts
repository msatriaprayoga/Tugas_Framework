import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty({message: "Email tidak boleh kosong"})
    readonly email: string;
    
    @IsNotEmpty({message: "Password tidak boleh kosong"})
    @MinLength(3, {message: "Password minimal 3 karakter"})
    @MaxLength(16, {message: "Password maksimal 16 karakter"})
    readonly password: string;
}