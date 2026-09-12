import express from "express";
import cors from "cors";
import * as pinoHttpModule from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

// Normalize pino-http's CommonJS/ESM export shape for NodeNext builds.
const pinoHttp: any =
  (pinoHttpModule as any).default ?? (pinoHttpModule as any);

// The API package is compiled independently in the monorepo. Keeping the
// Express instance typed as any avoids incompatible Express type copies that
// can be installed in nested workspace node_modules on Vercel.
const app: any = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;
