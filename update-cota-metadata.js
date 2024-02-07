import cotaPkg, { Aggregator, FEE } from "@nervina-labs/cota-sdk";
import { Collector } from "@nervina-labs/cota-sdk";
import pkg, {
  rawTransactionToHash,
  scriptToHash,
  serializeWitnessArgs,
} from "@nervosnetwork/ckb-sdk-utils";
import { generateCotaMetadataTx } from "./cota-sdk-import-fails/genCotaMetadataUpdate.js";
const { addressToScript, serializeScript } = pkg;
// const { generateCotaMetadataTx } = cotaPkg;

const TEST_PRIVATE_KEY =
  "0x59df3d4584579a4b8ae77e4d7a851d68178a0e19dbbdd53b5daab543943e1b31";
const TEST_ADDRESS = "ckt1qyqp8ydxwz3p4vcmjwc2d7zqk4xhv707j80q4yrap2";

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
  const cotaLock = addressToScript(TEST_ADDRESS);

  console.log(`lock ${serializeScript(cotaLock)}`);

  const cotaId = "0x6a88ed726beb82da1c7d78323b21693394dab500";

  const cotaInfo = {
    name: "Update First Step",
    description: "Hold onm brouih meatdata update",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKquyWpv_HKpTtFpUU6H098W9cVxSY4uK7TcylNCJXzw&s",
    tokenIndex: "0x00000005",
    audios: [
      {
        name: "audio01",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKquyWpv_HKpTtFpUU6H098W9cVxSY4uK7TcylNCJXzw&s",
        cotaId,
        idx: 0,
      },
      {
        name: "audio02",
        url: "https://i.loli.net/2021/04/29/qyJNSE4iHAas7GL.png",
        cotaId,
        idx: 1,
      },
    ],
  };

  let rawTx = await generateCotaMetadataTx(
    service,
    cotaLock,
    cotaId,
    cotaInfo,
    FEE,
    isMainnet
  );
  rawTx.cellDeps.push(secp256k1CellDep(isMainnet));

  console.log(
    "lock",
    serializeScript(
      addressToScript(
        "ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqq9mxjf0qnyfusww65kapv2rc0qdm6sjpvvadd4hp"
      )
    )
  );

  const signedTx = ckb.signTransaction(TEST_PRIVATE_KEY)(rawTx);
  console.log(JSON.stringify(signedTx));
  let txHash = await ckb.rpc.sendTransaction(signedTx, "passthrough");
  console.info(
    `Update cota metadata information tx has been sent with tx hash ${txHash}`
  );
};

run();
