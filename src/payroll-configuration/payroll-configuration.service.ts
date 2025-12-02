import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  allowance,
  allowanceDocument,
} from './models/allowance.schema';
import {
  insuranceBrackets,
  insuranceBracketsDocument,
} from './models/insuranceBrackets.schema';
import {
  payrollPolicies,
  payrollPoliciesDocument,
} from './models/payrollPolicies.schema';
import {
  payType,
  payTypeDocument,
} from './models/payType.schema';
import {
  signingBonus,
  signingBonusDocument,
} from './models/signingBonus.schema';
import {
  taxRules,
  taxRulesDocument,
} from './models/taxRules.schema';
import {
  terminationAndResignationBenefits,
  terminationAndResignationBenefitsSchema as terminationAndResignationBenefitsDocument,
} from './models/terminationAndResignationBenefits';
import {
  CompanyWideSettings,
  CompanyWideSettingsDocument,
} from './models/CompanyWideSettings.schema';
import {
  payGrade,
  payGradeDocument,
} from './models/payGrades.schema';
import { ConfigStatus } from './enums/payroll-configuration-enums';
import {
  CreateAllowanceDto,
  UpdateAllowanceDto,
} from './dto/allowance.dto';
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

@Injectable()
export class PayrollConfigurationService {
  constructor(
    @InjectModel(allowance.name)
    private readonly allowanceModel: Model<allowanceDocument>,
    @InjectModel(insuranceBrackets.name)
    private readonly insuranceModel: Model<insuranceBracketsDocument>,
    @InjectModel(payrollPolicies.name)
    private readonly policyModel: Model<payrollPoliciesDocument>,
    @InjectModel(payType.name)
    private readonly payTypeModel: Model<payTypeDocument>,
    @InjectModel(signingBonus.name)
    private readonly signingBonusModel: Model<signingBonusDocument>,
    @InjectModel(taxRules.name)
    private readonly taxRuleModel: Model<taxRulesDocument>,
    @InjectModel(terminationAndResignationBenefits.name)
    private readonly benefitModel: Model<any>, // schema type alias name is messy, keep any
    @InjectModel(CompanyWideSettings.name)
    private readonly settingsModel: Model<CompanyWideSettingsDocument>,
    @InjectModel(payGrade.name)
    private readonly payGradeModel: Model<payGradeDocument>,
  ) {}

  // ---------- ALLOWANCES ----------

  async createAllowance(dto: CreateAllowanceDto) {
    const created = new this.allowanceModel({
      ...dto,
      status: ConfigStatus.DRAFT,
    });
    return created.save();
  }

  async findAllAllowances() {
    return this.allowanceModel.find().exec();
  }

  async findAllowanceById(id: string) {
    const doc = await this.allowanceModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Allowance not found');
    return doc;
  }

  async updateAllowance(id: string, dto: UpdateAllowanceDto) {
    const updated = await this.allowanceModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Allowance not found');
    return updated;
  }

  async setAllowanceStatus(
    id: string,
    status: ConfigStatus,
    approverId?: string,
  ) {
    const update: any = { status };
    if (status === ConfigStatus.APPROVED) {
      update.approvedBy = approverId ?? null;
      update.approvedAt = new Date();
    }
    const updated = await this.allowanceModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Allowance not found');
    return updated;
  }

  // ---------- PAY GRADES ----------

  async createPayGrade(dto: CreatePayGradeDto) {
    const created = new this.payGradeModel({
      ...dto,
      status: ConfigStatus.DRAFT,
    });
    return created.save();
  }

  async findAllPayGrades() {
    return this.payGradeModel.find().exec();
  }

  async findPayGradeById(id: string) {
    const doc = await this.payGradeModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Pay grade not found');
    return doc;
  }

  async updatePayGrade(id: string, dto: UpdatePayGradeDto) {
    const updated = await this.payGradeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Pay grade not found');
    return updated;
  }

  async setPayGradeStatus(
    id: string,
    status: ConfigStatus,
    approverId?: string,
  ) {
    const update: any = { status };
    if (status === ConfigStatus.APPROVED) {
      update.approvedBy = approverId ?? null;
      update.approvedAt = new Date();
    }
    const updated = await this.payGradeModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Pay grade not found');
    return updated;
  }

  // ---------- PAY TYPES ----------

  async createPayType(dto: CreatePayTypeDto) {
    const created = new this.payTypeModel({
      ...dto,
      status: ConfigStatus.DRAFT,
    });
    return created.save();
  }

  async findAllPayTypes() {
    return this.payTypeModel.find().exec();
  }

  async updatePayType(id: string, dto: UpdatePayTypeDto) {
    const updated = await this.payTypeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Pay type not found');
    return updated;
  }

  async setPayTypeStatus(
    id: string,
    status: ConfigStatus,
    approverId?: string,
  ) {
    const update: any = { status };
    if (status === ConfigStatus.APPROVED) {
      update.approvedBy = approverId ?? null;
      update.approvedAt = new Date();
    }
    const updated = await this.payTypeModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Pay type not found');
    return updated;
  }

  // ---------- INSURANCE BRACKETS ----------

  async createInsuranceBracket(dto: CreateInsuranceBracketDto) {
    const created = new this.insuranceModel({
      ...dto,
      status: ConfigStatus.DRAFT,
    });
    return created.save();
  }

  async findAllInsuranceBrackets() {
    return this.insuranceModel.find().exec();
  }

  async updateInsuranceBracket(
    id: string,
    dto: UpdateInsuranceBracketDto,
  ) {
    const updated = await this.insuranceModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Insurance bracket not found');
    return updated;
  }

  async setInsuranceBracketStatus(
    id: string,
    status: ConfigStatus,
    approverId?: string,
  ) {
    const update: any = { status };
    if (status === ConfigStatus.APPROVED) {
      update.approvedBy = approverId ?? null;
      update.approvedAt = new Date();
    }
    const updated = await this.insuranceModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Insurance bracket not found');
    return updated;
  }

  // ---------- TAX RULES ----------

  async createTaxRule(dto: CreateTaxRuleDto) {
    const created = new this.taxRuleModel({
      ...dto,
      status: ConfigStatus.DRAFT,
    });
    return created.save();
  }

  async findAllTaxRules() {
    return this.taxRuleModel.find().exec();
  }

  async updateTaxRule(id: string, dto: UpdateTaxRuleDto) {
    const updated = await this.taxRuleModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Tax rule not found');
    return updated;
  }

  async setTaxRuleStatus(
    id: string,
    status: ConfigStatus,
    approverId?: string,
  ) {
    const update: any = { status };
    if (status === ConfigStatus.APPROVED) {
      update.approvedBy = approverId ?? null;
      update.approvedAt = new Date();
    }
    const updated = await this.taxRuleModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Tax rule not found');
    return updated;
  }

  // ---------- TERMINATION / RESIGNATION BENEFITS ----------

  async createBenefit(dto: CreateBenefitDto) {
    const created = new this.benefitModel({
      ...dto,
      status: ConfigStatus.DRAFT,
    });
    return created.save();
  }

  async findAllBenefits() {
    return this.benefitModel.find().exec();
  }

  async updateBenefit(id: string, dto: UpdateBenefitDto) {
    const updated = await this.benefitModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Benefit not found');
    return updated;
  }

  async setBenefitStatus(
    id: string,
    status: ConfigStatus,
    approverId?: string,
  ) {
    const update: any = { status };
    if (status === ConfigStatus.APPROVED) {
      update.approvedBy = approverId ?? null;
      update.approvedAt = new Date();
    }
    const updated = await this.benefitModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Benefit not found');
    return updated;
  }

  // ---------- PAYROLL POLICIES ----------

  async createPayrollPolicy(dto: CreatePayrollPolicyDto) {
    const created = new this.policyModel({
      ...dto,
      status: ConfigStatus.DRAFT,
    });
    return created.save();
  }

  async findAllPayrollPolicies() {
    return this.policyModel.find().exec();
  }

  async updatePayrollPolicy(id: string, dto: UpdatePayrollPolicyDto) {
    const updated = await this.policyModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Payroll policy not found');
    return updated;
  }

  async setPayrollPolicyStatus(
    id: string,
    status: ConfigStatus,
    approverId?: string,
  ) {
    const update: any = { status };
    if (status === ConfigStatus.APPROVED) {
      update.approvedBy = approverId ?? null;
      update.approvedAt = new Date();
    }
    const updated = await this.policyModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Payroll policy not found');
    return updated;
  }

  // ---------- COMPANY-WIDE SETTINGS (single document) ----------

  async getCompanySettings() {
    const settings = await this.settingsModel.findOne().exec();
    return settings;
  }

  async upsertCompanySettings(dto: UpdateCompanySettingsDto) {
    const payload: any = { ...dto };
    if (dto.payDate) {
      payload.payDate = new Date(dto.payDate);
    }

    const settings = await this.settingsModel
      .findOneAndUpdate({}, payload, {
        new: true,
        upsert: true,
      })
      .exec();

    return settings;
  }
}

