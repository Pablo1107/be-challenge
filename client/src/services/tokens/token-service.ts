import { ChainId, TokenId } from "../../types";
import { ITokenService } from "./types";

export class TokenService implements ITokenService {

  constructor(private readonly fetch: typeof globalThis.fetch, private readonly serverUrl: string) { }

  async getAllTokens(chainId: ChainId): Promise<TokenId[]> {
    const response = await this.fetch(this.serverUrl + `/chains/${chainId}/tokens`)
    if (!response.ok) throw new Error(`Failed to fetch tokens. Error code was: ${response.status}`)
    const body = await response.json()
    return body.tokens
  }

}