import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Rahul Agro API is running",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "rahul-agro-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", router);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Server error:", error);

    res.status(error?.status || 500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  },
);

export default app;
