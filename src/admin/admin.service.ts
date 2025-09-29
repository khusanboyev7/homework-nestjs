import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { Admins } from "./models/admin.model";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admins) private readonly adminsModel: typeof Admins
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);

    const newAdmin = await this.adminsModel.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    return newAdmin;
  }

  async findAll() {
    return this.adminsModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminsModel.findByPk(id);
    if (!admin) throw new NotFoundException("Admin topilmadi");
    return admin;
  }

  async findAdminByEmail(email: string) {
    return this.adminsModel.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (updateAdminDto.password) {
      updateAdminDto = {
        ...updateAdminDto,
        password: await bcrypt.hash(updateAdminDto.password, 7),
      };
    }

    return admin.update(updateAdminDto);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: "Admin o‘chirildi" };
  }
}
