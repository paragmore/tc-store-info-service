import { injectable } from "inversify";
import { Types } from "mongoose";
import { BusinessAdminModel } from "../models/business.admin.model";
import { StoreModel } from "../models/store.model";
import {
  OnboardStoreRequestI,
  StoreI,
  UpdateLastInvoiceInfoRequestI,
} from "../types/storeInfo.types";

@injectable()
export class StoreInfoRepo {
  constructor() {}

  async updateLastInvoiceInfo(req: UpdateLastInvoiceInfoRequestI) {
    const { storeId, previousInvoiceId, sequence } = req;
    const newInvoiceId = previousInvoiceId + 1;
    const update: {
      lastInvoiceInfo?: { sequence?: string; invoiceId: number };
    } = {};
    if (sequence) {
      update.lastInvoiceInfo = { sequence, invoiceId: newInvoiceId };
    } else {
      update.lastInvoiceInfo = { invoiceId: newInvoiceId };
    }

    return await StoreModel.findOneAndUpdate({ _id: storeId }, update);
  }
  async updateStore(body: OnboardStoreRequestI) {
    const {
      storeId,
      allowCreditReportAccess,
      businessDomain,
      businessType,
      logoUrl,
      name,
      onlineStoreLive,
      plan,
      gstInfo,
    } = body;
    if (gstInfo) {
      console.log(gstInfo);
      const updatedStore = await StoreModel.updateOne(
        { _id: storeId },
        {
          allowCreditReportAccess,
          businessDomain,
          businessType: gstInfo.nba[0]?.trim(),
          logoUrl,
          name: gstInfo.lgnm?.trim(),
          onlineStoreLive,
          plan,
          address: {
            firstLine: gstInfo.pradr?.adr?.trim(),
            city: gstInfo.pradr?.addr?.city?.trim(),
            district: gstInfo.pradr?.addr?.dst?.trim(),
            pinCode: gstInfo.pradr?.addr?.pncd?.trim(),
            state: gstInfo.pradr?.addr?.stcd?.trim(),
          },
          gstNumber: gstInfo.gstin?.trim(),
        }
      );
      return updatedStore;
    }
    const updatedStore = await StoreModel.updateOne(
      { _id: storeId },
      {
        allowCreditReportAccess,
        businessDomain,
        businessType,
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
    return {
      ...businessAdmin?.toObject(),
      stores: storesInfo,
      defaultStoreId: storesInfo[0]._id,
    };
  }

  async getStoreInfoByStoreId(storeId: Types.ObjectId | undefined) {
    const storeInfo = await StoreModel.findById(storeId);
    return storeInfo;
  }
}
