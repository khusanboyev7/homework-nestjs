import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Medicines } from "../../medicines/models/medicine.model";
import { Stock } from "../../stock/models/stock.model";
import { District } from "../../district/models/district.model";

interface IPharmaciesCreationAttr {
  name: string;
  address: string;
  location: string;
  phone: string;
  email: string;
  regionId: number;
  districtId: number;
}

@Table({ tableName: "pharmacies" })
export class Pharmacies extends Model<Pharmacies, IPharmaciesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare location: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare email: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare regionId: number;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare districtId: number;

  @BelongsTo(() => Region)
  region: Region;

  @BelongsTo(() => District)
  district: District;

  // @HasMany(() => MachineDriver)
  // machineDriver: MachineDriver[];

  @BelongsToMany(() => Medicines, () => Stock)
  medicines: Medicines[];
}
