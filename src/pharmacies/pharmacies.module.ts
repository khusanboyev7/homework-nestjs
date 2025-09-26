import { Module } from "@nestjs/common";
import { PharmaciesService } from "./pharmacies.service";
import { PharmaciesController } from "./pharmacies.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Pharmacies } from "./models/pharmacy.model";
import { Region } from "../region/models/region.model";
import { Stock } from "../stock/models/stock.model";

@Module({
  imports: [SequelizeModule.forFeature([Pharmacies, Region, Stock])],
  controllers: [PharmaciesController],
  providers: [PharmaciesService],
})
export class PharmaciesModule {}
