import { AppComponents } from '../../app/types';
import { Request, Response } from "express";
import { isChainValid } from '../../logic/chains';
import { hasConnectionInSwaps } from '../../logic/graph';

export async function tokenConnectionHandler(components: AppComponents, req: Request, res: Response) {
  const { theGraph, logger } = components

  if (!req.body) {
    res.status(400).send({ error: 'Invalid request body' })
    return
  }
  const { chainId } = req.params
  const { token1, token2 } = req.body

  if (!chainId || !token1 || !token2) {
    res.status(400).send({ error: 'Some of the following keys are missing: "chainId", "token1", "token2"' })
  }

  if (!isChainValid(chainId)) {
    res.status(400).send({ error: 'Invalid chain id' })
    return
  }

  try {
    const { swaps } = await theGraph.getDailySwaps(chainId)

    res.send({ hasConnection: hasConnectionInSwaps(swaps, token1, token2) })
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: 'Something went wrong' })
  }
}
