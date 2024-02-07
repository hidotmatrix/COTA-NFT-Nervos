import {
  Aggregator,
  FEE,
  generateMintCotaTx,
  generateClaimCotaTx,
  generateUpdateCotaTx,
} from "@nervina-labs/cota-sdk";
import { Collector } from "@nervina-labs/cota-sdk";
import pkg, {
  rawTransactionToHash,
  scriptToHash,
  serializeWitnessArgs,
} from "@nervosnetwork/ckb-sdk-utils";
const { addressToScript, serializeScript } = pkg;

const RECEIVER_PRIVATE_KEY =
  "0xb9449dc7e16f89bc2840f2e4c8a2fbbbd71f56aeca7f6e8d34d8b31192e5f93f";
const RECEIVER_ADDRESS = "ckt1qyqdvq39qrxcw6hpl0lp07y0qu2659ml7h5sfz8s6a";

const secp256k1CellDep = (isMainnet) => {
  if (isMainnet) {
    return {
      outPoint: {
        txHash:
          "0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c",
        index: "0x0",
      },
      depType: "depGroup",
    };
  }
  return {
    outPoint: {
      txHash:
        "0xf8de3bb47d055cdf460d93a2a6e1b05f7432f9777c8c474abf4eec1d4aee5d37",
      index: "0x0",
    },
    depType: "depGroup",
  };
};

const run = async () => {
  // True for mainnet and false for testnet
  const isMainnet = false;

  const service = {
    collector: new Collector({
      ckbNodeUrl: "https://testnet.ckbapp.dev/rpc",
      ckbIndexerUrl: "https://testnet.ckbapp.dev/rpc",
    }),
    aggregator: new Aggregator({
      registryUrl: "https://cota.nervina.dev/registry-aggregator",
      cotaUrl: "https://cota.nervina.dev/aggregator",
    }),
  };
  const ckb = service.collector.getCkb();
  const cotaLock = addressToScript(RECEIVER_ADDRESS);

  const cotaNfts = [
    {
      cotaId: "0x6a88ed726beb82da1c7d78323b21693394dab500",
      tokenIndex: "0x00000000",
      state: "0x00",
      characteristic: "0x0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKquyWpv_HKpTtFpUU6H098W9cVxSY4uK7TcylNCJXzw&s",
    },
  ];

  let rawTx = await generateUpdateCotaTx(
    service,
    cotaLock,
    cotaNfts,
    FEE,
    isMainnet
  );
  rawTx.cellDeps.push(secp256k1CellDep(isMainnet));

  const signedTx = ckb.signTransaction(RECEIVER_PRIVATE_KEY)(rawTx);
  console.log(JSON.stringify(signedTx));
  let txHash = await ckb.rpc.sendTransaction(signedTx, "passthrough");
  console.info(`Update cota nft tx has been sent with tx hash ${txHash}`);
};

run();
