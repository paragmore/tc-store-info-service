import {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify";
import jwt from "jsonwebtoken";
// Middleware to authenticate the JWT

//@ts-ignore
export const authenticateTokenBase: ExtendedPreHandlerHookHandler = (
  req,
  res,
  next,
  type
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.trim();
  if (token == null) {
    res.statusCode = 401;
    return res.send("Auth accessToken not found");
  }
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET not found in authenticateToken middleware");
    next();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    console.log(err);
    if (err) {
      res.statusCode = 403;
      return res.send(`${err.message}`);
    }
    console.log(user);
    if (user.userType !== type) {
      res.statusCode = 401;
      return res.send("Not Authorized");
    }
    console.log("is", type);
    //@ts-ignore
    req.user = user;
    next();
  });
};

export const authenticateBusinessAdminToken: preHandlerHookHandler = (
  req,
  res,
  next
) => {
  console.log("idhar");
  //@ts-ignore
  authenticateTokenBase(req, res, next, USER_TYPE.BUSINESS_ADMIN);
};

export const authenticateToken: preHandlerHookHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.trim();
  console.log(authHeader);
  if (token == null) {
    res.statusCode = 401;
    return res.send("Auth accessToken not found");
  }
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET not found in authenticateToken middleware");
    next();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    console.log(err);
    if (err) {
      res.statusCode = 403;
      return res.send(`${err.message}`);
    }
    console.log(user);
    //@ts-ignore
    req.user = user;
    next();
  });
};

type NewType<RawServer extends RawServerBase> =
  RawReplyDefaultExpression<RawServer>;

export interface ExtendedPreHandlerHookHandler<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends NewType<RawServer> = RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  AdditionalArg = USER_TYPE // add your additional argument type here
> extends preHandlerHookHandler<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  > {
  (
    this: FastifyInstance<
      RawServer,
      RawRequest,
      RawReply,
      Logger,
      TypeProvider
    >,
    request: FastifyRequest<
      RouteGeneric,
      RawServer,
      RawRequest,
      SchemaCompiler,
      TypeProvider,
      ContextConfig,
      Logger
    >,
    reply: FastifyReply<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider
    >,
    done: HookHandlerDoneFunction,
    type: AdditionalArg // include the additional argument type here
  ): void;
}

export enum USER_TYPE {
  CUSTOMER = "CUSTOMER",
  STORE_ADMIN = "STORE_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  BUSINESS_ADMIN = "BUSINESS_ADMIN",
}
