import { Express } from "express";
import { AppComponents } from "../app/types";
import { statusHandler } from "./handlers/status-handler";
import { tokensHandler } from "./handlers/tokens-handler";
import { tokenConnectionHandler } from "./handlers/token-connection-handler";

export async function configureRoutes(
  expressApp: Express,
  components: AppComponents
) {
  expressApp.get("/status", (req, res) => statusHandler(components, req, res));
  expressApp.get("/chains/:chainId/tokens", (req, res) => tokensHandler(components, req, res));
  expressApp.post("/chains/:chainId/token-connection", (req, res) => tokenConnectionHandler(components, req, res));
}
