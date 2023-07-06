import { ChainId } from "../app/types";

export function isChainValid(chainId: any): chainId is ChainId {
  if (Number.isNaN(parseInt(chainId))) 
    return false
  return chainId < 10_000_000
}