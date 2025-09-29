import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() CreateAdminDto: CreateAdminDto) {
    return this.authService.signup(CreateAdminDto);
  }
  @Post("signin")
  signin(@Body() CreateAdminDto: CreateAdminDto) {
    return this.authService.signin(CreateAdminDto);
  }
}
