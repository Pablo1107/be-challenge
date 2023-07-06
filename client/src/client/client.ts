import crossFetch from 'cross-fetch'
import { TokenService } from "../services/tokens/token-service";
import { IMeanClient } from "./types";

export type MeanClientBuildParams = {
  serverUrl: string,
  fetch?: typeof globalThis.fetch
}
export function buildMeanClient({ fetch, serverUrl }: MeanClientBuildParams): IMeanClient {
  const tokenService = new TokenService(fetch ?? crossFetch, serverUrl)
  return {
    tokens: tokenService
  }
}