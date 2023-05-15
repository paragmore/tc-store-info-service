import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { StoreInfoController } from "../controllers/storeInfo.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";
import { OnboardStoreRequestI } from "../types/storeInfo.types";
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
    "/userAndStoresInfo",
    storeInfoController.getUserAndStoresInfo.bind(storeInfoController),
    { preHandler: [authenticateBusinessAdminToken] }
  );
};
