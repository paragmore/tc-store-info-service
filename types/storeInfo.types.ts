import { USER_TYPE } from "../middlewares/auth.middleware";

export interface OnboardStoreRequestI {
  name: string;
  logoUrl?: string;
  businessType?: string;
  businessDomain?: string;
  gstNumber?: string;
  allowCreditReportAccess?: boolean;
  onlineStoreLive?: boolean;
  plan?: string;
  storeId: string;
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
