import mongoose, { Schema } from "mongoose";
import { type } from "os";

const addressSchema = new Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  firstLine: {
    type: String,
  },
  secondLine: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  district: {
    type: String,
  },
});

export const lastInvoiceInfoSchema = new Schema({
  sequence: {
    type: String,
    required: true,
  },
  invoiceId: {
    type: Number,
    required: true,
  },
  billId: {
    type: Number,
    required: true,
  },
  billSequence: {
    type: String,
    required: true,
  },
  paymentNumber: {
    type: Number,
    required: true,
  },
});

const storeSchema = new Schema(
  {
    name: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    businessType: {
      type: String,
    },
    businessDomain: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    allowCreditReportAccess: {
      type: Boolean,
    },
    onlineStoreLive: {
      type: Boolean,
    },
    plan: {
      type: String,
    },
    address: {
      type: addressSchema,
    },
    location: {
      type: String,
    },
    companyType: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    lastInvoiceInfo: {
      type: lastInvoiceInfoSchema,
      default: {
        sequence: "#INV-",
        invoiceId: 0,
        billId: 0,
        billSequence: "#BILL-",
        paymentNumber: 0,
      }, // Set your desired default values
    },
  },
  { timestamps: true }
);

export const StoreModel = mongoose.model("Store", storeSchema);
