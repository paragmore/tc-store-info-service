import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { StoreInfoController } from "../controllers/storeInfo.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";
import {
  OnboardStoreRequestI,
  UpdateLastInvoiceInfoRequestI,
  VerifyStoreGSTRequestParamsI,
} from "../types/storeInfo.types";
import {
  authenticateBusinessAdminToken,
  authenticateToken,
} from "../middlewares/auth.middleware";

export default async (app: FastifyInstance) => {
  const storeInfoController =
    container.resolve<StoreInfoController>(StoreInfoController);

  ApiHelper.post<OnboardStoreRequestI, {}, {}, {}>(
    app,
    "/onboardStore",
    storeInfoController.onboardStore.bind(storeInfoController),
    { preHandler: [authenticateBusinessAdminToken] }
  );

  ApiHelper.get<{}, {}, {}>(
    app,
    "/",
    storeInfoController.getUserAndStoresInfo.bind(storeInfoController),
    { preHandler: [authenticateBusinessAdminToken] }
  );

  ApiHelper.get<{}, VerifyStoreGSTRequestParamsI, {}>(
    app,
    "/verifyGSTIN/:storeId/:gstin",
    storeInfoController.verifyStoreGST.bind(storeInfoController),
    { preHandler: [authenticateBusinessAdminToken] }
  );

  ApiHelper.post<UpdateLastInvoiceInfoRequestI, {}, {}, {}>(
    app,
    "/updateLastInvoiceInfo",
    storeInfoController.updateLastInvoiceInfo.bind(storeInfoController),
    { preHandler: [] }
  );
};
