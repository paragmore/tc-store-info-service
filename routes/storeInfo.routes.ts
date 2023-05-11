import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { StoreInfoController } from "../controllers/storeInfo.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";

export default async (app: FastifyInstance) => {
  const storeInfoController = container.resolve<StoreInfoController>(StoreInfoController)

  ApiHelper.get<{}, {}, {}>(
    app,
    "/",
    storeInfoController.storeInfoController.bind(storeInfoController)
  );
};
