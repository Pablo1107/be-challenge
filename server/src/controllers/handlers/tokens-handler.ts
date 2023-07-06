import { AppComponents } from '../../app/types';
import { Request, Response } from "express";
import { isChainValid } from '../../logic/chains';

export async function tokensHandler(components: AppComponents, req: Request, res: Response) {
  const { theGraph, logger } = components
  const { chainId } = req.params

  if (!isChainValid(chainId)) {
    res.status(400).send({ error: 'Invalid chain id' })
    return
  }

  try {
    const tokens = await theGraph.tokens(chainId)
    res.send({ tokens })
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: 'Something went wrong' })
  }
}
