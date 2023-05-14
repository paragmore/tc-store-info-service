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
