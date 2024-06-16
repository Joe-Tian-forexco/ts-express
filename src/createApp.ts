import express from "express";
import router from "./routes/upload";

export function createApp() {
  const app = express();
  app.use("/api", router);

  return app
}
