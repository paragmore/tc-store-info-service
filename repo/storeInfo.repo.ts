import { injectable } from "inversify";
import { Types } from "mongoose";
import { BusinessAdminModel } from "../models/business.admin.model";
import { StoreModel } from "../models/store.model";
import { OnboardStoreRequestI, StoreI } from "../types/storeInfo.types";

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
    return updatedStore;
  }

  async getUserAndStoresInfoByUserId(userId: string) {
    console.log("userId", userId);
    const businessAdmin = await BusinessAdminModel.findById(userId);
    const storesPromises = businessAdmin?.stores.map(async (store) => {
      const storeInfo = await this.getStoreInfoByStoreId(store.storeId);
      return { ...storeInfo?.toObject(), role: store.role };
    });
    if (!storesPromises) {
      return businessAdmin;
    }
    const storesInfo = await Promise.all(storesPromises);
    return { ...businessAdmin?.toObject(), stores: storesInfo };
  }

  async getStoreInfoByStoreId(storeId: Types.ObjectId | undefined) {
    const storeInfo = await StoreModel.findById(storeId);
    return storeInfo;
  }
}
