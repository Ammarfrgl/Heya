// src/payroll-configuration/dto/pay-type.dto.ts
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePayTypeDto {
  @IsString()
  type: string; // "Monthly", "Hourly", etc.

  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  createdBy?: string;
}

export class UpdatePayTypeDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;
}
