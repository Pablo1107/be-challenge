import crossFetch from 'cross-fetch'
import { TokenService } from "../../../src/services/tokens/token-service";

const URL = 'http://localhost:8081'

// Note: server needs to be up and runing for this test to work
describe("Token Service", () => {

  const service = new TokenService(crossFetch, URL)

  it('tokens can be fetched correctly', async () => {
    const allTokens = await service.getAllTokens(1)
    expect(allTokens.length).toBeGreaterThan(0)
    expect(allTokens.includes('ETH')).toBeTruthy()
    expect(allTokens.includes('BNB')).toBeTruthy()
  })

});
