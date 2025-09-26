import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { Pharmacies } from './models/pharmacy.model';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from '../region/models/region.model';


@Injectable()
export class PharmaciesService {
  constructor(
    @InjectModel(Pharmacies) private readonly pharmaciesModel: typeof Pharmacies,
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}

  async create(CreatePharmacyDto: CreatePharmacyDto): Promise<Pharmacies> {
    const { name, address, location, phone, email, regionId, districtId } = CreatePharmacyDto;
    if (!address || !name || !regionId || !location || !phone || !districtId || !email) {
      throw new NotFoundException("Iltimos barchasini kiriting");
    }

    const regionModel = await this.regionModel.findByPk(regionId);
    if (!regionModel) {
      throw new NotFoundException("Bunday region mavjud emas");
    }

    return this.pharmaciesModel.create(CreatePharmacyDto);
  }


  findAll(): Promise<Pharmacies[]> {
    return this.pharmaciesModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Pharmacies | null> {
    const pharmacyId = await this.pharmaciesModel.findByPk(id, {
      include: { all: true },
    });
    if (!pharmacyId) {
      throw new NotFoundException("Machine not found");
    }

    return pharmacyId;
  }

  async update(id: number, UpdatePharmacyDto: UpdatePharmacyDto) {
    const { name, address, location, phone, email } = UpdatePharmacyDto;

    const pharmacyId = await this.pharmaciesModel.findByPk(id);
    if (!pharmacyId) {
      throw new BadRequestException("Pharmacy not found");
    }

    const pharmacy = await this.pharmaciesModel.update(UpdatePharmacyDto, {
      where: { id },
      returning: true,
    });
    return pharmacy[1][0];
  }

  async remove(id: number) {
    const deleted = await this.pharmaciesModel.destroy({ where: { id } });
    if (!deleted) {
      return { message: "Bunday Pharmacy mavjud emas" };
    }
    return { message: "Pharmacy O'chirildi " };
  }
}
