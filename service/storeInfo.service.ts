import { inject, injectable } from "inversify";
import { StoreInfoRepo } from "../repo/storeInfo.repo";
import { OnboardStoreRequestI } from "../types/storeInfo.types";

@injectable()
export class StoreInfoService {
  constructor(@inject(StoreInfoRepo) private storeInfoRepo: StoreInfoRepo) {}

  onboardStore(storeReq: OnboardStoreRequestI) {
    const {
      storeId,
      allowCreditReportAccess,
      businessDomain,
      businessType,
      gstNumber,
      logoUrl,
      name,
      onlineStoreLive,
      plan,
    } = storeReq;
    const updatePayload = {
      storeId,
      allowCreditReportAccess,
      businessDomain,
      businessType,
      gstNumber,
      logoUrl,
      name,
      onlineStoreLive,
      plan,
    };

    this.storeInfoRepo.updateStore(updatePayload);
  }

  getUserAndStoresInfo(){

  }

  getStoreInfo(storeId: string){

  }
}
