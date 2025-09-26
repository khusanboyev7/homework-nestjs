import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock } from './models/stock.model';
import { Medicines } from '../medicines/models/medicine.model';
import { Pharmacies } from '../pharmacies/models/pharmacy.model';

@Module({
  imports: [SequelizeModule.forFeature([Stock, Medicines, Pharmacies])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
