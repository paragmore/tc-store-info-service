import { inject, injectable } from "inversify";
import { StoreInfoRepo } from "../repo/storeInfo.repo";

@injectable()
export class StoreInfoService {
  constructor(@inject(StoreInfoRepo) private storeInfoRepo: StoreInfoRepo) {}
}
