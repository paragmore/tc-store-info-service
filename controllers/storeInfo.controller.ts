import { inject, injectable } from "inversify";
import { StoreInfoService } from "../service/storeInfo.service";
import {
  ApiHelper,
  ApiHelperHandler,
  IReply,
} from "../utils/ApiHelper";

@injectable()
export class StoreInfoController {
  constructor(@inject(StoreInfoService) private storeInfoService: StoreInfoService) {}
  createAndOnboardStore: ApiHelperHandler<{}, {}, {}, {}, IReply> =
    async (request, reply) => {
      return ApiHelper.success(reply, {hello: 'world'})
    };
}
