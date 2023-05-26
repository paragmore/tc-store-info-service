import { inject, injectable } from "inversify";
import { StoreInfoRepo } from "../repo/storeInfo.repo";
import { CheckGSTINResponse, OnboardStoreRequestI, UserI } from "../types/storeInfo.types";
import { requestExecutor } from "../utils/RequestExecutor";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class StoreInfoService {
  constructor(@inject(StoreInfoRepo) private storeInfoRepo: StoreInfoRepo) {}

  async verifyStoreGST(gstin: string) {
    const verifyGSTINUrl = `https://sheet.gstincheck.co.in/check/1972c16ea52250b8b25d45ec32e1d313/${gstin}`;
    const response = await requestExecutor(verifyGSTINUrl, { method: "GET" }) as CheckGSTINResponse;
    if(!response.flag){
      return new ApiError(`${response.errorCode} ==> ${response.message}`,500)
    }
    return response.data
  }
  async onboardStore(storeReq: OnboardStoreRequestI) {
    const {
      storeId,
      allowCreditReportAccess,
      businessDomain,
      businessType,
      logoUrl,
      name,
      onlineStoreLive,
      plan,
      gstInfo
    } = storeReq;
    const updatePayload = {
      storeId,
      allowCreditReportAccess,
      businessDomain,
      businessType,
      logoUrl,
      name,
      onlineStoreLive,
      plan,
      gstInfo
    };

    return await this.storeInfoRepo.updateStore(updatePayload);
  }

  async getUserAndStoresInfo(user: UserI) {
    const userAndStoresInfo =
      await this.storeInfoRepo.getUserAndStoresInfoByUserId(user?.userId);
    return userAndStoresInfo;
  }

  getStoreInfo(storeId: string) {}
}
