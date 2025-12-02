// src/payroll-configuration/dto/tax-rule.dto.ts
import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateTaxRuleDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  rate: number; // percentage

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}

export class UpdateTaxRuleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  rate?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
