import { injectable } from "inversify";
import { StoreModel } from "../models/store.model";
import { OnboardStoreRequestI } from "../types/storeInfo.types";

@injectable()
export class StoreInfoRepo {
  constructor() {}

  async updateStore(body: OnboardStoreRequestI) {
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
    } = body;
    const updatedStore = await StoreModel.updateOne(
      { id: storeId },
      {
        allowCreditReportAccess,
        businessDomain,
        businessType,
        gstNumber,
        logoUrl,
        name,
        onlineStoreLive,
        plan,
      }
    );
    return updatedStore
  }
}
