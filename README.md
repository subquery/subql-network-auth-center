# Subquery Netwrok Auth Service

The auth service provides a convinient way for users consume the queries from indexers with ongoing service agreements or PAYG plans.

## Architecture

![auth](https://user-images.githubusercontent.com/8177474/200216575-9cd0f92c-23df-4272-a37f-4b92f37e4efa.png)

## Start Service

1. Provide the local env:

```
# private key of the consumer or controller account
SK="c2902e065cf0aa3af47b7e067b8c57dd9249d2639e4ca7fefd8c000cc9567d07"
# consumer address
CONSUMER="0x7ADb4675B448295b6be86812DDC28F1B0E0Eb876"
# chain id for the network
CHAIN_ID=1287
```

2. Run `yarn dev` to start the server locally.
