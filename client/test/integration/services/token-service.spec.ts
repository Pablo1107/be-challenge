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

  it('tokens cannot be fetched correctly', async () => {
    await expect(service.getAllTokens(9999999999999)).rejects.toThrow()
  })

  it('get if two tokens have connection', async () => {
    const hasConnection = await service.hasConnection(1, 'ETH', 'BNB')
    expect(typeof hasConnection).toBe('boolean')
  })

  it('token connection throws error if invalid chain', async () => {
    await expect(service.hasConnection(9999999999999, 'ETH', 'BNB')).rejects.toThrow()
  })

});
