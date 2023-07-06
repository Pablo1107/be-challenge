import { AppComponents } from "./app/types";
import { createTheGraphClient } from "./ports/the-graph";

export async function initComponents(): Promise<AppComponents> {
  return {
    logger: console,
    theGraph: await createTheGraphClient()
  };
}
