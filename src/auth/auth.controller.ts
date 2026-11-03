import { Body, Controller, Patch, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { ForgetPasswordDto } from './dto/forget-password.dto.js';
import { PasswordRecoveryDto } from './dto/password-recory.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('ForgetPassword')
    forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
        return this.authService.forgetPassword(forgetPasswordDto);
    }

    @Patch('passwordrecovery')
    resetPassword(@Body() passwordRecoveryDto: PasswordRecoveryDto) {
        return this.authService.passwordRecovery(passwordRecoveryDto);
    }
}
