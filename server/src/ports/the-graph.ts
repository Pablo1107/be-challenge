import { TokenId, ChainId, Timestamp } from "../app/types"

export type DailySwaps = { swaps: Swap[], lastUpdated: Timestamp }
export type Swap = { sellToken: TokenId, buyToken: TokenId, sellAmount: number, buyAmount: number }
export type ITheGraphClient = {

  /**
   * Returns all tokens available on the given chain
   */
  tokens(chainId: ChainId): Promise<TokenId[]>;

  /**
   * Returns all swaps executed in our platform in the last day (up to 00 UTC)
   */
  getDailySwaps(chainId: ChainId): Promise<DailySwaps>
}

export async function createTheGraphClient(): Promise<ITheGraphClient> {
  return new TheGraphClient()
}


// This graph client mock will generate random responses and return them. Each day will have it's own response 
// generated
class TheGraphClient implements ITheGraphClient {

  private lastResponse: Map<ChainId, DailySwaps> = new Map()

  async tokens(chainId: ChainId) {
    return TOKEN_IDS
  }

  async getDailySwaps(chainId: ChainId)  {
    const lastUpdated = new Date(this.lastResponse.get(chainId)?.lastUpdated ?? 0)
    if (getDayString(lastUpdated) !== getDayString(new Date())) {
      this.lastResponse.set(chainId, { swaps: generateNewResponse(), lastUpdated: Date.now() })
    }
    return this.lastResponse.get(chainId)!
  }

}

const TOKEN_IDS = [
  'ETH',
  'BNB',
  'MATIC',
  'AAVE',
  'YFI',
  'USDC',
  'USDT',
  'MEAN',
  'DAI',
  'FXS',
  'VELO',
  'WBTC',
  'LINK',
  'ARB',
  'OP'
]

function generateNewResponse() {
  const amountOfSwaps = Math.round(Math.random() * 1000)
  const swaps: DailySwaps['swaps'] = []
  for (let i = 0; i < amountOfSwaps; i++) {
    const sellToken = chooseRandom(TOKEN_IDS)
    const buyToken = chooseRandom(without(TOKEN_IDS, sellToken))
    swaps[i] = { sellToken, buyToken, sellAmount: Math.floor(Math.random() * 10000), buyAmount: Math.floor(Math.random() * 10000) }
  }
  return swaps
}

// We are removing time and returning the date, in UTC terms
function getDayString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function chooseRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function without<T>(array: T[], without: T): T[] {
  return array.filter(element => element !== without)
}