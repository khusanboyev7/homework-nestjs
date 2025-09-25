import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Medicines } from './models/medicine.model';
import { MedicineType } from '../medicine-type/models/medicine-type.model';

@Module({
  imports: [SequelizeModule.forFeature([Medicines, MedicineType])],
  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {}
