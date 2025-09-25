import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicines } from './models/medicine.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MedicinesService{
  constructor(
    @InjectModel(Medicines) private readonly MedicinesModel: typeof Medicines
  ) {}
  create(CreateMedicineDto: CreateMedicineDto): Promise<Medicines> {
    return this.MedicinesModel.create(CreateMedicineDto);
  }

  findAll(): Promise<Medicines[]> {
    return this.MedicinesModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Medicines | null> {
    return this.MedicinesModel.findByPk(id);
  }
  findOneByName(name: string): Promise<Medicines | null> {
    return this.MedicinesModel.findOne({ where: { name } });
  }

  async update(id: number, UpdateMedicineDto: UpdateMedicineDto) {
    const Medicines = await this.MedicinesModel.update(UpdateMedicineDto, {
      where: { id },
      returning: true,
    });
    return Medicines[1][0];
  }

  async remove(id: number) {
    const delCount = await this.MedicinesModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas " };
    }
    return { message: "Kompaniya o'chirildi, id" };
  }
}

