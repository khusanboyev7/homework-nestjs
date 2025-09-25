export class CreateMedicineDto {
  name: string;
  manufacturer: string;
  medicine_type_id: number;
  price: number;
  expiry_date: Date;
  info: string;
}
