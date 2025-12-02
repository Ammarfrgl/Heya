import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PayrollConfigurationService } from './payroll-configuration.service';
import { CreateAllowanceDto, UpdateAllowanceDto } from './dto/allowance.dto';
import { ConfigStatus } from './enums/payroll-configuration-enums';
import {
  CreatePayGradeDto,
  UpdatePayGradeDto,
} from './dto/pay-grade.dto';
import {
  CreatePayTypeDto,
  UpdatePayTypeDto,
} from './dto/pay-type.dto';
import {
  CreateInsuranceBracketDto,
  UpdateInsuranceBracketDto,
} from './dto/insurance-bracket.dto';
import {
  CreateTaxRuleDto,
  UpdateTaxRuleDto,
} from './dto/tax-rule.dto';
import {
  CreateBenefitDto,
  UpdateBenefitDto,
} from './dto/benefit.dto';
import {
  CreatePayrollPolicyDto,
  UpdatePayrollPolicyDto,
} from './dto/payroll-policy.dto';
import { UpdateCompanySettingsDto } from './dto/company-settings.dto';

@Controller('payroll-configuration')
export class PayrollConfigurationController {
  constructor(
    private readonly service: PayrollConfigurationService,
  ) {}

  // -------- ALLOWANCES --------

  @Post('allowances')
  createAllowance(@Body() dto: CreateAllowanceDto) {
    return this.service.createAllowance(dto);
  }

  @Get('allowances')
  getAllowances() {
    return this.service.findAllAllowances();
  }

  @Get('allowances/:id')
  getAllowance(@Param('id') id: string) {
    return this.service.findAllowanceById(id);
  }

  @Patch('allowances/:id')
  updateAllowance(
    @Param('id') id: string,
    @Body() dto: UpdateAllowanceDto,
  ) {
    return this.service.updateAllowance(id, dto);
  }

  @Patch('allowances/:id/status')
  setAllowanceStatus(
    @Param('id') id: string,
    @Query('status') status: ConfigStatus,
    @Query('approverId') approverId?: string,
  ) {
    return this.service.setAllowanceStatus(id, status, approverId);
  }

  // -------- PAY GRADES --------

  @Post('pay-grades')
  createPayGrade(@Body() dto: CreatePayGradeDto) {
    return this.service.createPayGrade(dto);
  }

  @Get('pay-grades')
  getPayGrades() {
    return this.service.findAllPayGrades();
  }

  @Get('pay-grades/:id')
  getPayGrade(@Param('id') id: string) {
    return this.service.findPayGradeById(id);
  }

  @Patch('pay-grades/:id')
  updatePayGrade(
    @Param('id') id: string,
    @Body() dto: UpdatePayGradeDto,
  ) {
    return this.service.updatePayGrade(id, dto);
  }

  @Patch('pay-grades/:id/status')
  setPayGradeStatus(
    @Param('id') id: string,
    @Query('status') status: ConfigStatus,
    @Query('approverId') approverId?: string,
  ) {
    return this.service.setPayGradeStatus(id, status, approverId);
  }

  // -------- PAY TYPES --------

  @Post('pay-types')
  createPayType(@Body() dto: CreatePayTypeDto) {
    return this.service.createPayType(dto);
  }

  @Get('pay-types')
  getPayTypes() {
    return this.service.findAllPayTypes();
  }

  @Patch('pay-types/:id')
  updatePayType(
    @Param('id') id: string,
    @Body() dto: UpdatePayTypeDto,
  ) {
    return this.service.updatePayType(id, dto);
  }

  @Patch('pay-types/:id/status')
  setPayTypeStatus(
    @Param('id') id: string,
    @Query('status') status: ConfigStatus,
    @Query('approverId') approverId?: string,
  ) {
    return this.service.setPayTypeStatus(id, status, approverId);
  }

  // -------- INSURANCE BRACKETS --------

  @Post('insurance-brackets')
  createInsuranceBracket(
    @Body() dto: CreateInsuranceBracketDto,
  ) {
    return this.service.createInsuranceBracket(dto);
  }

  @Get('insurance-brackets')
  getInsuranceBrackets() {
    return this.service.findAllInsuranceBrackets();
  }

  @Patch('insurance-brackets/:id')
  updateInsuranceBracket(
    @Param('id') id: string,
    @Body() dto: UpdateInsuranceBracketDto,
  ) {
    return this.service.updateInsuranceBracket(id, dto);
  }

  @Patch('insurance-brackets/:id/status')
  setInsuranceBracketStatus(
    @Param('id') id: string,
    @Query('status') status: ConfigStatus,
    @Query('approverId') approverId?: string,
  ) {
    return this.service.setInsuranceBracketStatus(
      id,
      status,
      approverId,
    );
  }

  // -------- TAX RULES --------

  @Post('tax-rules')
  createTaxRule(@Body() dto: CreateTaxRuleDto) {
    return this.service.createTaxRule(dto);
  }

  @Get('tax-rules')
  getTaxRules() {
    return this.service.findAllTaxRules();
  }

  @Patch('tax-rules/:id')
  updateTaxRule(
    @Param('id') id: string,
    @Body() dto: UpdateTaxRuleDto,
  ) {
    return this.service.updateTaxRule(id, dto);
  }

  @Patch('tax-rules/:id/status')
  setTaxRuleStatus(
    @Param('id') id: string,
    @Query('status') status: ConfigStatus,
    @Query('approverId') approverId?: string,
  ) {
    return this.service.setTaxRuleStatus(id, status, approverId);
  }

  // -------- BENEFITS --------

  @Post('benefits')
  createBenefit(@Body() dto: CreateBenefitDto) {
    return this.service.createBenefit(dto);
  }

  @Get('benefits')
  getBenefits() {
    return this.service.findAllBenefits();
  }

  @Patch('benefits/:id')
  updateBenefit(
    @Param('id') id: string,
    @Body() dto: UpdateBenefitDto,
  ) {
    return this.service.updateBenefit(id, dto);
  }

  @Patch('benefits/:id/status')
  setBenefitStatus(
    @Param('id') id: string,
    @Query('status') status: ConfigStatus,
    @Query('approverId') approverId?: string,
  ) {
    return this.service.setBenefitStatus(id, status, approverId);
  }

  // -------- PAYROLL POLICIES --------

  @Post('policies')
  createPayrollPolicy(@Body() dto: CreatePayrollPolicyDto) {
    return this.service.createPayrollPolicy(dto);
  }

  @Get('policies')
  getPayrollPolicies() {
    return this.service.findAllPayrollPolicies();
  }

  @Patch('policies/:id')
  updatePayrollPolicy(
    @Param('id') id: string,
    @Body() dto: UpdatePayrollPolicyDto,
  ) {
    return this.service.updatePayrollPolicy(id, dto);
  }

  @Patch('policies/:id/status')
  setPayrollPolicyStatus(
    @Param('id') id: string,
    @Query('status') status: ConfigStatus,
    @Query('approverId') approverId?: string,
  ) {
    return this.service.setPayrollPolicyStatus(
      id,
      status,
      approverId,
    );
  }

  // -------- COMPANY-WIDE SETTINGS --------

  @Get('company-settings')
  getCompanySettings() {
    return this.service.getCompanySettings();
  }

  @Patch('company-settings')
  updateCompanySettings(
    @Body() dto: UpdateCompanySettingsDto,
  ) {
    return this.service.upsertCompanySettings(dto);
  }
}
