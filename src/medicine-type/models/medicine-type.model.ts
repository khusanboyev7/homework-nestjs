import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { Medicines } from "../../medicines/models/medicine.model";


interface IMedicinesTypeCreationAttr {
  name: string;
}

@Table({ tableName: "medicine_type" })
export class MedicineType extends Model<MedicineType, IMedicinesTypeCreationAttr> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  name: string;

  
  @HasMany(() => Medicines)
  medicines: Medicines[];
}
