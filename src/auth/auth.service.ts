import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { User } from './entities/user-entity.js';
import { LoginDto } from './dto/login.dto.js';
import { ForgetPasswordDto } from './dto/forget-password.dto.js';
import { PasswordRecoveryDto } from './dto/password-recory.dto.js';

@Injectable()
export class AuthService {

    register(registerDto: RegisterDto): User {
       const newUser = new User();
        newUser.username = registerDto.username;
        newUser.email = registerDto.email;
        newUser.password = registerDto.password;
        
        return newUser;
    }

    login(loginDto: LoginDto): User{
        const newUser = new User();
        newUser.email = loginDto.email;
        newUser.password = loginDto.password;
        return newUser;
    }

    forgetPassword(forgetPasswordDto: ForgetPasswordDto) : User{
        const newUser = new User();
        newUser.email = forgetPasswordDto.email;
        return newUser;
    }

    passwordRecovery(passwordRecoveryDto: PasswordRecoveryDto): User {
        const newUser = new User();
        newUser.email = passwordRecoveryDto.email;
        newUser.password = passwordRecoveryDto.newPassword;
        return newUser;
    }
}
