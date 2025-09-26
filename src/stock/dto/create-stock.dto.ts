import { IsNotEmpty, IsString } from "class-validator";

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  pharmacyId: number;
  medicineId: number;
  quanity: number;
}
