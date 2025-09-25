import { Injectable } from '@nestjs/common';
import { CreateMedicineTypeDto } from './dto/create-medicine-type.dto';
import { UpdateMedicineTypeDto } from './dto/update-medicine-type.dto';
import { MedicineType } from './models/medicine-type.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MedicineTypeService {
  constructor(
    @InjectModel(MedicineType) private readonly MedicineModel: typeof MedicineType
  ) {}
  create(CreateMedicineTypeDto: CreateMedicineTypeDto): Promise<MedicineType> {
    return this.MedicineModel.create(CreateMedicineTypeDto);
  }

  findAll(): Promise<MedicineType[]> {
    return this.MedicineModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<MedicineType | null> {
    return this.MedicineModel.findByPk(id);
  }
  findOneByName(name: string): Promise<MedicineType | null> {
    return this.MedicineModel.findOne({ where: { name } });
  }

  async update(id: number, UpdateMedicineTypeDto: UpdateMedicineTypeDto) {
    const MedicineType = await this.MedicineModel.update(UpdateMedicineTypeDto, {
      where: { id },
      returning: true,
    });
    return MedicineType[1][0];
  }

  async remove(id: number) {
    const delCount = await this.MedicineModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas " };
    }
    return { message: "Kompaniya o'chirildi, id" };
  }
}
