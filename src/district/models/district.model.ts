import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district" })
export class District extends Model<District, IDistrictCreationAttr> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @ForeignKey(()=> Region)
  @Column({
    type: DataType.INTEGER,
    onDelete: "Cascade",
  })
  declare regionId: number;

  @BelongsTo(()=> Region)
  region: Region
}
