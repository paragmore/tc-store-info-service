import "reflect-metadata";
import { Container } from 'inversify';
import { StoreInfoController } from './controllers/storeInfo.controller';
import { StoreInfoRepo } from './repo/storeInfo.repo';
import { StoreInfoService } from './service/storeInfo.service';

const container = new Container();

container.bind<StoreInfoService>(StoreInfoService).toSelf();
container.bind<StoreInfoRepo>(StoreInfoRepo).toSelf();
container.bind<StoreInfoController>(StoreInfoController).toSelf()

export default container;