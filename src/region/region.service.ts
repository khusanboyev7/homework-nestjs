import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.model';
import { InjectModel } from "@nestjs/sequelize";


@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}
  create(CreateRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionModel.create(CreateRegionDto);
  }

  findAll(): Promise<Region[]> {
    return this.regionModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Region | null> {
    return this.regionModel.findByPk(id);
  }
  findOneByName(name: string): Promise<Region | null> {
    return this.regionModel.findOne({ where: { name } });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const Region = await this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    return Region[1][0];
  }

  async remove(id: number) {
    const delCount = await this.regionModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas " };
    }
    return { message: "Kompaniya o'chirildi, id" };
  }
}
