import { IsNotEmpty, IsString } from "class-validator";

export class CreatePharmacyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  address: string;
  location: string;
  phone: string;
  email: string;
  regionId: number;
  districtId: number;
}
