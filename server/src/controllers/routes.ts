import { Express } from "express";
import { AppComponents } from "../app/types";
import { statusHandler } from "./handlers/status-handler";
import { tokensHandler } from "./handlers/tokens-handler";

export async function configureRoutes(
  expressApp: Express,
  components: AppComponents
) {
  expressApp.get("/status", (req, res) => statusHandler(components, req, res));
  expressApp.get("/chains/:chainId/tokens", (req, res) => tokensHandler(components, req, res));
}
