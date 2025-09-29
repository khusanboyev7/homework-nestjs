import {
  IsString,
  IsEmail,
  IsBoolean,
  MinLength,
  IsOptional,
} from "class-validator";

export class CreateAdminDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6, { message: "Parol kamida 6 belgidan iborat bo‘lishi kerak" })
  readonly password: string;

  @IsBoolean()
  @IsOptional()
  readonly is_active?: boolean;
}
