import express, {
  type ErrorRequestHandler,
  type Request,
  type Response,
  type NextFunction
} from "express";
import cors from "cors";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Request logging
 */
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(
    {
      method: req.method,
      path: req.originalUrl
    },
    "Incoming request"
  );

  next();
});

/**
 * Root endpoint
 */
app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "Rahul Agro API",
    status: "ok",
    message: "Rahul Agro API server is running"
  });
});

/**
 * Health-check endpoint
 */
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "rahul-agro-api"
  });
});

/**
 * API routes
 */
app.use("/api", router);

/**
 * 404 handler
 */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist"
  });
});

/**
 * Error handler
 */
const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  logger.error(
    {
      error
    },
    "Unhandled application error"
  );

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : error instanceof Error
          ? error.message
          : "An unexpected error occurred"
  });
};

app.use(errorHandler);

export default app;
