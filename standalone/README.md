# Standalone apps

These applications are meant to be ran/opened in vscode in their respective directories

## Portal API

Please find the documentation [here](docs/PortalApi.md)

## Insomnia collections

For the relevant backends there is also an `Insomnia` collection included. 

Find more information about the collections [here](insomnia/README.md)

##Chainhook integration

* Run chainhook tests with `yarn clarinet:chainhook:tests`

## How to run the POC

* Run 

```
> cd standalone/infrastructure && docker-compose up
```

This will create the infrastructure (RabbitMq, Prometheus, Grafana)

* Start up the consumer

```
> cd standalone/chainhook && yarn start:dev
```

Make sure to install dependencies first of course

* Start up Portal API

```
> cd standalone/portal && yarn start:dev
```

Make sure that you installed the dependencies first, and that you've run the migrations 

```
> yarn migration:run
```

You can also drop the migrations: 

```
> yarn schema:drop
```

* Run the integration test and then have a look at `http://localhost:3000/api/v1/auctionhistory/0`

You should be getting the history of the auction entity you just inserted

```
[
   "Auction with the id \"0\" was created at 7/28/2023, 3:46:30 PM. The id was changed to \"10b289cf-1684-4544-b1e0-f2c3b4548b87\". The createdAt was changed to \"2023-07-28T12:46:30.742Z\". The updatedAt was changed to \"2023-07-28T09:46:30.706Z\". The hash was changed to \"5b13b317d797e65992c2064d058cc8ace0dbe490b3026b8a1a76073f02342aa1\". The auctionId was changed to \"0\". The endBlock was changed to \"1000\". The highestBid was changed to \"0\". The maker was changed to \"ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5\". The nftAsset was changed to \"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft\". The highestBidder was changed to \"null\". The status was changed to \"OPEN\".",
   "Auction bid with the amount \"1200.00\" and bidder \"ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG\" was created at 7/28/2023, 3:46:30 PM. The id was changed to \"997d1955-349e-4a00-bfb8-6d722d0b590d\". The createdAt was changed to \"2023-07-28T12:46:30.935Z\". The updatedAt was changed to \"2023-07-28T09:46:30.883Z\". The hash was changed to \"2ea36fd6353a3b87da323c95fa71ae881c830f7ac6529600242817f9894f9603\". The amount was changed to \"1200.00\". The bidder was changed to \"ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG\".",
   "Auction with the id \"0\" was updated at 7/28/2023, 3:46:31 PM. The updatedAt was changed to \"2023-07-28T12:46:30.961Z\". The hash was changed to \"95f95053620e826235584568dfd452ea5af14a9fd5aec0cb6d26b697d27c2e4d\". The highestBid was changed to \"1200.00\". The highestBidder was changed to \"ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG\".",
   "Auction bid with the amount \"5000.00\" and bidder \"ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC\" was created at 7/28/2023, 3:46:31 PM. The id was changed to \"01ebce17-9dc9-4dbc-91e6-a4ad4d299711\". The createdAt was changed to \"2023-07-28T12:46:31.056Z\". The updatedAt was changed to \"2023-07-28T09:46:31.026Z\". The hash was changed to \"6a70cc66d818027a29dd5f5af4a12c225be09b6bb7d36dcb610e84194c938500\". The amount was changed to \"5000.00\". The bidder was changed to \"ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC\".",
   "Auction with the id \"0\" was updated at 7/28/2023, 3:46:31 PM. The updatedAt was changed to \"2023-07-28T12:46:31.076Z\". The hash was changed to \"2f25544ed3b1e3d32a593e8193be8526f87f0923ee748a535f605771f822b963\". The highestBid was changed to \"5000.00\". The highestBidder was changed to \"ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC\".",
   "Auction with the id \"0\" was updated at 7/28/2023, 3:46:31 PM. The updatedAt was changed to \"2023-07-28T12:46:31.225Z\". The hash was changed to \"1bc7cc24cc3bd580a457e26a8cb12a1738b906f1b9f1e43c99f18d6f76931006\". The status was changed to \"CANCELLED\"."
]
```