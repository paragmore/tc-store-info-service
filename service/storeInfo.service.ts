import { inject, injectable } from "inversify";
import { StoreInfoRepo } from "../repo/storeInfo.repo";
import { OnboardStoreRequestI, UserI } from "../types/storeInfo.types";

@injectable()
export class StoreInfoService {
  constructor(@inject(StoreInfoRepo) private storeInfoRepo: StoreInfoRepo) {}

  async onboardStore(storeReq: OnboardStoreRequestI) {
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

    return await this.storeInfoRepo.updateStore(updatePayload);
  }

  async getUserAndStoresInfo(user: UserI){
    const userAndStoresInfo = await this.storeInfoRepo.getUserAndStoresInfoByUserId(user?.userId)
    return userAndStoresInfo
  }

  getStoreInfo(storeId: string){

  }
}
