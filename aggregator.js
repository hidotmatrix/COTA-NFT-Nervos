import { Aggregator } from "@nervina-labs/cota-sdk";
import pkg, {
  rawTransactionToHash,
  scriptToHash,
  serializeWitnessArgs,
} from "@nervosnetwork/ckb-sdk-utils";
const { addressToScript, serializeScript } = pkg;

const RECEIVER_ADDRESS = "ckt1qyqdvq39qrxcw6hpl0lp07y0qu2659ml7h5sfz8s6a";
const ISSUER_ADDRESS = "ckt1qyqp8ydxwz3p4vcmjwc2d7zqk4xhv707j80q4yrap2";

const run = async () => {
  const aggregator = new Aggregator({
    registryUrl: "https://cota.nervina.dev/registry-aggregator",
    cotaUrl: "https://cota.nervina.dev/aggregator",
  });
  const cotaLock = serializeScript(addressToScript(RECEIVER_ADDRESS));
  const issuerLock = serializeScript(addressToScript(ISSUER_ADDRESS));
  const holds = await aggregator.getHoldCotaNft({
    lockScript: cotaLock,
    page: 0,
    pageSize: 10,
  });
  console.log(`----------------------------
  
  `);
  console.log("HOLDS", holds);
  console.log(`----------------------------
  
  `);

  const withdrawals = await aggregator.getWithdrawCotaNft({
    lockScript: cotaLock,
    page: 0,
    pageSize: 10,
  });
  console.log("WITHDRAWALS", withdrawals);
  console.log(`----------------------------
  
  `);

  const holdsWithCotaId = await aggregator.getHoldCotaNft({
    lockScript: cotaLock,
    page: 0,
    pageSize: 10,
    cotaId: "0x6a88ed726beb82da1c7d78323b21693394dab500",
  });
  console.log("HOLD_WITH_COTA_ID", holdsWithCotaId);
  console.log(`----------------------------
  
  `);

  const senderLockHash = await aggregator.getCotaNftSender({
    lockScript: cotaLock,
    cotaId: "0x6a88ed726beb82da1c7d78323b21693394dab500",
    tokenIndex: "0x00000000",
  });
  console.log(JSON.stringify(senderLockHash));
  console.log(`----------------------------
  
  `);

  const result = await aggregator.checkReisteredLockHashes([
    "0x6a8f45a094cbe050d1a612924901b11edc1bce28c0fd8d96cdc8779889f28aa8",
    "0xbe30bcf4cfc2203cb7bf53b111cae4ced9af8674f088f8ea54b3efb76a5a4050",
  ]);
  console.log(JSON.stringify(result));
  console.log(`----------------------------
  
  `);

  const defineInfo = await aggregator.getDefineInfo({
    cotaId: "0x6a88ed726beb82da1c7d78323b21693394dab500",
  });
  console.log("Get Define Info", defineInfo);
  console.log(`----------------------------
  
  `);

  const isClaimed = await aggregator.isClaimed({
    lockScript: cotaLock,
    cotaId: "0x6a88ed726beb82da1c7d78323b21693394dab500",
    tokenIndex: "0x00000000",
  });
  console.log(JSON.stringify(isClaimed));
  console.log(`----------------------------
  
  `);

  const issuerInfo = await aggregator.getIssuerInfo({
    lockScript: issuerLock,
  });
  console.log(JSON.stringify(issuerInfo));
  console.log(`----------------------------
  
  `);

  const cotaCount = await aggregator.getCotaCount({
    lockScript: cotaLock,
    cotaId: "0x6a88ed726beb82da1c7d78323b21693394dab500",
  });
  console.log(JSON.stringify(cotaCount));
};

run();
