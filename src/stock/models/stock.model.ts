import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Pharmacies } from "../../pharmacies/models/pharmacy.model";
import { Medicines } from "../../medicines/models/medicine.model";

interface ISockCreationAttr {
  pharmacyId: number;
  medicineId: number;
  quanity: number;
}

@Table({ tableName: "stock" })
export class Stock extends Model<Stock, ISockCreationAttr> {
  @ForeignKey(() => Pharmacies)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare pharmacyId: number;

  @BelongsTo(() => Pharmacies)
  pharmacy: Pharmacies;

  @ForeignKey(() => Medicines)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare medicineId: number;

  @BelongsTo(() => Medicines)
  medicines: Medicines;

  @Column({ type: DataType.INTEGER(), allowNull: false })
  quanity: number;
}
