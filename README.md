# COTA-NFT-Nervos

### Index NFT data of User Wallet

`node aggregator.js`

### Register Cota cell of User Wallet

`node register.js`

### Issuing Issuer Data

`node issuer.js`

### Define Collection Data

`node define.js`

### Update Collection Data

`node update-cota-metadata.js`

### Mint NFT for a Reciever address

`node mint.js`

### Claim NFT as a Reciever address

`node claim.js`

### Update NFT info as a Reciever address

`node update.js`

## CoTA NFT Flow

```
                     Register CoTA cell firstly
1. Alice & Bob & Tom ----------------------------------> Alice CoTA cell & Bob CoTA cell & Tom CoTA cell

          Define CoTA NFT               Mint CoTA NFT A to receivers
2. Alice -----------------------> NFT A -----------------------------------> Receivers (Bob)

                    Claim NFT A                                  Withdraw NFT A to Tom
       Action1 |-------------------------> Bob hold NFT A now ----------------------------------> Bob doesn't hold NFT A now
      |             Transfer NFT A to Tom
3. Bob Action2 |-----------------------------------> Bob doesn't hold NFT A now
      |           Update CoTA NFT A information
       Action3 |-----------------------------------> Bob hold CoTA NFT A with new information

                    Claim NFT A                                 Withdraw NFT A to other receivers
        Action1 |-------------------------> Tom hold NFT A now ----------------------------------> Tom doesn't hold NFT A now
4. Tom |         Transfer NFT A to other receivers
        Action2 |-----------------------------------> Tom doesn't hold NFT A now

```

- Registry: Every address should be registered firstly
- Define: The issuer can define a collection NFTs with total/name/description/image etc.
- Mint: The issuer mint the defined NFTs to the receivers (withdraw to the receivers actually)
- Claim: The receiver can claim the NFT from the mint, and now the receiver hold the NFT
- Update: The holder of NFT can update the information (characteristic/state etc.)
- Withdraw: The holder of NFT can withdraw the NFT to any other CKB address
- Transfer: To simplify, transfer combines the claim and withdraw into one operation. The receiver can claim the NFT from the mint and withdraw the same NFT to others in a transaction.

## Examples

- [aggregator example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/aggregator.ts): Fetch CoTA NFT data(include issuer/NFT class info) from Aggregator server
- [registry example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/registry.ts): Generate registering CoTA cells transaction
- [issuer example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/issuer.ts): Generate setting issuer information transaction
- [define example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/define.ts): Generate setting cota information and defining CoTA cells transaction
- [mint example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/mint.ts): Generate minting CoTA NFT transaction
- [claim example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/claim.ts): Generate claiming CoTA NFT transaction
- [withdraw example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/withdraw.ts): Generate withdrawing CoTA NFT transaction
- [transfer example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/transfer.ts): Generate transferring CoTA NFT transaction
- [update example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/update.ts): Generate updating CoTA NFT information transaction
- [claim&update example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/claim-update.ts): Generate claiming and updateing CoTA NFT transaction
- [transfer&update example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/transfer-update.ts): Generate transferring and updating CoTA NFT transaction
