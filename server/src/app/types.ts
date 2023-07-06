import { ITheGraphClient } from "../ports/the-graph";

export type Logger = {
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
};

export type AppComponents = {
  theGraph: ITheGraphClient
  logger: Logger;
};

export type ChainId = number
export type TokenId = string
export type Timestamp = number
