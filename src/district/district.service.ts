import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './models/district.model';
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtModel: typeof District
  ) {}
  create(CreateDistrictDto: CreateDistrictDto): Promise<District> {
    return this.districtModel.create(CreateDistrictDto);
  }

  findAll(): Promise<District[]> {
    return this.districtModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<District | null> {
    return this.districtModel.findByPk(id);
  }
  findOneByName(name: string): Promise<District | null> {
    return this.districtModel.findOne({ where: { name } });
  }

  async update(id: number, UpdateDistrictDto: UpdateDistrictDto) {
    const District = await this.districtModel.update(UpdateDistrictDto, {
      where: { id },
      returning: true,
    });
    return District[1][0];
  }

  async remove(id: number) {
    const delCount = await this.districtModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas " };
    }
    return { message: "Kompaniya o'chirildi, id" };
  }
}

