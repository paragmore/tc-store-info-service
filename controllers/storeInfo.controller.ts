import { inject, injectable } from "inversify";
import { StoreInfoService } from "../service/storeInfo.service";
import { OnboardStoreRequestI } from "../types/storeInfo.types";
import { ApiHelper, ApiHelperHandler, IReply } from "../utils/ApiHelper";

@injectable()
export class StoreInfoController {
  constructor(
    @inject(StoreInfoService) private storeInfoService: StoreInfoService
  ) {}
  onboardStore: ApiHelperHandler<OnboardStoreRequestI, {}, {}, {}, IReply> =
    async (request, reply) => {
      const { body } = request;
      //@ts-ignore
      console.log('geee',request?.user)
      if (!body || !body.storeId || !body.name) {
        return ApiHelper.missingParameters(reply);
      }
      this.storeInfoService.onboardStore(body);
      return ApiHelper.success(reply, { hello: "world" });
    };
}
