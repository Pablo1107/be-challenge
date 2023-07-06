import { isChainValid } from "../../src/logic/chains";

describe("Chains", () => {
  it('non-number chain ids are invalid', () => {
    expect(isChainValid(true)).toBeFalsy()
    expect(isChainValid({})).toBeFalsy()
    expect(isChainValid([])).toBeFalsy()
    expect(isChainValid("text")).toBeFalsy()
  })

  it('chain ids that are too high are invalid', () => {
    expect(isChainValid(10_000_000)).toBeFalsy()
  })

  it('number chains are valid', () => {
    expect(isChainValid(10)).toBeTruthy()
  })
});
