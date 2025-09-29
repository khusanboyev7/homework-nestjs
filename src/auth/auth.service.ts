import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import * as bcrypt from  "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Admins } from "../admin/models/admin.model";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { signinUserDto } from "../admin/dto/signin-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}
  private async generateToken(user: Admins) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return { token: this.jwtService.sign(payload) };
  }
  async signup(CreateAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      CreateAdminDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const hashedPassword = await bcrypt.hash(CreateAdminDto.password, 7);

    const newAdmin = await this.adminService.create({
        ...CreateAdminDto,
        password: hashedPassword
    })



    const newAdmins = await this.adminService.create(CreateAdminDto);
    return newAdmins;
  }

  async signin(signinUserDto: signinUserDto) {
    const user = await this.adminService.findAdminByEmail(signinUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const verifyPassword = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );
    if (!verifyPassword) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    return this.generateToken(user);
  }
}
