import mongoose, { Schema } from "mongoose";

export enum BusinessAdminRolesEnum {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}
const businessAdminSchema = new Schema(
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
  },
  { timestamps: true }
);

export const BusinessAdminModel = mongoose.model(
  "BusinessAdmin",
  businessAdminSchema
);
