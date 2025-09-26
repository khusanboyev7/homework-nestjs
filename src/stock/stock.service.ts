import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './models/stock.model';
import { InjectModel } from '@nestjs/sequelize';
import { Pharmacies } from '../pharmacies/models/pharmacy.model';
import { Medicines } from '../medicines/models/medicine.model';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock)
    private readonly stockModel: typeof Stock,
    @InjectModel(Pharmacies) private readonly pharmacyModel: typeof Pharmacies,
    @InjectModel(Medicines) private readonly medicineModel: typeof Medicines
  ) {}

  async create(
    CreateStockDto: CreateStockDto
  ): Promise<Stock> {
    const { pharmacyId, medicineId, quanity } = CreateStockDto;

    if (!pharmacyId || !medicineId || !quanity) {
      throw new NotFoundException("Barchasini kiriting");
    }

    const pharmacyModel = await this.pharmacyModel.findByPk(pharmacyId);
    if (!pharmacyModel) {
      throw new NotFoundException("Bunday machine mavjud emas");
    }

    const medicineModel = await this.medicineModel.findByPk(medicineId);
    if (!medicineModel) {
      throw new NotFoundException("bunday driver mavjud emas");
    }

    return this.stockModel.create(CreateStockDto);
  }

  findAll(): Promise<Stock[]> {
    return this.stockModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Stock | null> {
    const stock = await this.stockModel.findByPk(id, {
      include: { all: true },
    });
    if (!stock) {
      throw new NotFoundException("Stock not found");
    }

    return stock;
  }

  async update(id: number, UpdateStockDto: UpdateStockDto) {
    const stock = await this.stockModel.findByPk(id);
    if (!stock) {
      throw new NotFoundException("Stock not found");
    }

    const Stock = await this.stockModel.update(
      UpdateStockDto,
      { where: { id }, returning: true }
    );
    return Stock[1][0];
  }

  async remove(id: number) {
    const stock = await this.stockModel.destroy({
      where: { id },
    });
    if (!stock) {
      return { message: "Bunday Stock mavjud emas" };
    }
    return { message: "Stock o'chirildi", id };
  }
}
