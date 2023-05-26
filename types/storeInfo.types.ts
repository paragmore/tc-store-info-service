import { USER_TYPE } from "../middlewares/auth.middleware";

export interface VerifyGSTINResponseI {
  ntcrbs: string;
  adhrVFlag: string;
  lgnm: string;
  stj: string;
  dty: string;
  cxdt: string;
  gstin: string;
  nba: string[];
  ekycVFlag: string;
  cmpRt: string;
  rgdt: string;
  ctb: string;
  pradr: {
    adr: string;
    addr: {
      flno: string;
      lg: string;
      loc: string;
      pncd: string;
      bnm: string;
      city: string;
      lt: string;
      stcd: string;
      bno: string;
      dst: string;
      st: string;
    };
  };
  sts: string;
  tradeNam: string;
  isFieldVisitConducted: string;
  ctj: string;
  einvoiceStatus: string;
  lstupdt: string;
  adadr: any[];
  ctjCd: string;
  errorMsg: null | string;
  stjCd: string;
}

export interface VerifyStoreGSTRequestParamsI {
  gstin: string;
  storeId: string;
}
export interface OnboardStoreRequestI {
  storeId: string;
  gstInfo?: VerifyGSTINResponseI;
  name?: string;
  logoUrl?: string;
  businessType?: string;
  businessDomain?: string;
  allowCreditReportAccess?: boolean;
  onlineStoreLive?: boolean;
  plan?: string;
}

export interface GSTINResponseData {
  ntcrbs: string;
  adhrVFlag: string;
  lgnm: string;
  stj:string;
  dty: string;
  cxdt: string;
  gstin: string;
  nba: string[];
  ekycVFlag: string;
  cmpRt: string;
  rgdt: string;
  ctb: string;
  pradr: {
    adr: string;
    addr: {
      flno: string;
      lg: string;
      loc: string;
      pncd: string;
      bnm: string;
      city: string;
      lt: string;
      stcd: string;
      bno: string;
      dst: string;
      st: string;
    };
  };
  sts: string;
  tradeNam: string;
  isFieldVisitConducted: string;
  ctj: string;
  einvoiceStatus: string;
  lstupdt: string;
  adadr: [];
  ctjCd: string;
  errorMsg: string;
  stjCd: string;
}
export interface CheckGSTINResponse {
  flag: boolean;
  message: string;
  errorCode?: string;
  data: GSTINResponseData;
}

export interface UserI {
  userId: string;
  userType: USER_TYPE;
}

export interface StoreI {
  _id: string;
  name: string;
  logoUrl: string;
  businessType: string;
  businessDomain: string;
  gstNumber: string;
  allowCreditReportAccess: boolean;
  onlineStoreLive: boolean;
  plan: string;
}
