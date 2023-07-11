import { AppComponents } from '../../app/types';
import { Request, Response } from "express";
import { isChainValid } from '../../logic/chains';
import { Graph } from '../../logic/graph';

export async function tokenConnectionHandler(components: AppComponents, req: Request, res: Response) {
  const { theGraph, logger } = components

  console.log({ req,  body: req.body })
  if (!req.body) {
    res.status(400).send({ error: 'Invalid request body' })
    return
  }
  const { chainId, token1, token2 } = req.body

  if (!chainId || !token1 || !token2) {
    res.status(400).send({ error: 'Some of the following keys are missing: "chainId", "token1", "token2"' })
  }

  if (!isChainValid(chainId)) {
    res.status(400).send({ error: 'Invalid chain id' })
    return
  }

  try {
    const { swaps } = await theGraph.getDailySwaps(chainId)

    const graph = new Graph()
    for (const swap of swaps) {
      graph.addEdge(swap.sellToken, swap.buyToken)
    }

    res.send({ hasConnection: graph.hasPathDFS(token1, token2), swaps })
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: 'Something went wrong' })
  }
}
