import { FastifyInstance } from "fastify"
import storeInfoRoutes from "./routes/storeInfo.routes"
export default async(app: FastifyInstance)=>{
    app.register(storeInfoRoutes, {prefix:'/storeInfo'})
}