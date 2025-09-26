import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { MedicineType } from "../../medicine-type/models/medicine-type.model";
import { Pharmacies } from "../../pharmacies/models/pharmacy.model";
import { Stock } from "../../stock/models/stock.model";

interface IMedicinesCreationAttr {
  name: string;
  manufacturer: string;
  medicine_type_id: number;
  price: number;
  expiry_date: Date;
  info: string;
}

@Table({ tableName: "medicines" })
export class Medicines extends Model<Medicines, IMedicinesCreationAttr> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  manufacturer: string;

  @ForeignKey(() => MedicineType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  medicine_type_id: number;

  @Column({ type: DataType.INTEGER(), allowNull: false })
  price: number;

  @Column({ type: DataType.DATE(), allowNull: false })
  expiry_date: Date;

  @Column({ type: DataType.STRING(), allowNull: false })
  info: string;

  @BelongsTo(() => MedicineType)
  medicineType: MedicineType;

  @BelongsToMany(() => Pharmacies, () => Stock)
  pharmaices: Pharmacies;
}
