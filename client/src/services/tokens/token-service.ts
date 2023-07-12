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

  async hasConnection(chainId: ChainId, token1: TokenId, token2: TokenId): Promise<boolean> {
    const response = await this.fetch(this.serverUrl + `/chains/${chainId}/token-connection`, {
      method: 'POST',
      body: JSON.stringify({ token1, token2 }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`Failed to make request. Error code was: ${response.status}`)
    const body = await response.json()
    return body.hasConnection
  }
}
