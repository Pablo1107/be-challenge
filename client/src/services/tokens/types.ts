import { ChainId, TokenId } from "../../types"

export type ITokenService = {
  getAllTokens(chainId: ChainId): Promise<TokenId[]>
}