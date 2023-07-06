# BE Challange

## Before starting
This challenge aims to tackle problems very similar to what Mean's team does on a day to day basis. There are some terms related to cryptocurrencies, but no prior knowledge is needed to attempt the challenge. If you'd like to attempt this challege, please:
1. Clone this repository (but make it private)
2. Perform the tasks described below
3. Contact us on [hiring@mean.finance](mailto:hiring@mean.finance) and we'll follow up from there 🫡

We encourage you to tackle this challenge as you would normally work on other projects. Feel free to look up any information or algorithms that might help you achieve the defined goals.

Also, we would be more than happy to hear your feedback (good or bad) about the exercise to learn and make it better. Feel free to send all comments, suggestions and ideas to [hiring@mean.finance](mailto:hiring@mean.finance).

## Introduction
The idea of this exercise is to set up a server that performs certain analysis over how the Mean Finance protocol is used. In particular, we want to study how users are using the protocol and see if there are some ways we can improve it. Once the server exposes this data, we will update a small Typescript client to make it easier to consume from different places.

## What is already there?
There is already a server provided, built in Typescript, with an endpoint that returns all supported tokens in a given chain. See [server/README.md](server/README.md) for more details.

There is also a Typescript client provided. See [client/README.md](client/README.md) for more details.

## What you need to do
Mean Finance has a few different products, most about swapping between different cryptocurrencies (or tokens). Mean Finance is also available on multiple blockchains (or chains), and users might behave differently on each of them. 
Our users can use our [Swap](https://mean.finance/swap) product to swap between two tokens. We track these swaps using [The Graph](https://thegraph.com/), and we want to be able to make some queries to a server, to suggest improve our Swap product's UX.

### Server
There is already mocked The Graph client on the server that returns all swaps executed during the previous day (up until 00 UTC). For example, during the previous day, there might have been swaps between:
- `ETH` and `MATIC`
- `MATIC` and `USDC`
- `USDT` and `BNB`

You will need to add a new endpoint so that we can ask our server if there have been swaps that would establish a connection between two tokens. For example, by looking into the examples before, we could say that there was a swap connection between `ETH` and `MATIC`, but also between `ETH` and `USDC` (the connection would be `ETH => MATIC => USDC`). It's not relevant which token was sold and which one was bought, only if they were swaps between them. Also, we can see that while there was a swap connection between `ETH` and `USDC`, there was no connection between `ETH` and `BNB`. 

We want this endpoint to return whether two tokens have a swap connection based on the swaps of the previous day. Also, we want to be able to ask for different pairs of tokens in different chains, all in the same request. For example, we would like to ask if there is a connection between `ETH` and `MATIC` on chain `1`, or if there is a connection between `USDC` and `BNB` on chain `10`.

Finally, it's important to note something important about the The Graph client: 
- It will automatically return the swaps for the previous day after 00 UTC
- These value will not change up until the next day (again, at 00 UTC)
- The service is not reliable and it fails often

### Client
Once the new endpoint is built, we want to add a way to interact with it to our existing client. As before, it would need to handle querying for different pairs of tokens in different chains.
