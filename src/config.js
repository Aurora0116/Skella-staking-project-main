import { web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = "9F8CKAQSFNjRYpKifAshJJfTC5dT9uqg3MvVVdWvcBRE";

export const GLOBAL_AUTHORITY_SEED = "new-global-authority";
export const USER_POOL_SEED = "F-new-user-pool";
export const raffleSeed = [
  "F-new-one-day-seed",
  "F-new-five-day-seed",
  "F-new-fourteen-day-seed",
];
export const DAY = [300, 300 * 2, 300 * 3];
// export const DAY = [86400, 86400 * 5, 86400 * 14];

export const MAX_WINNERS = 10;
export const USER_POOL_SIZE = 7264; // 8 + 7256
export const RAFFLE_POOL_SIZE = 32968; // 8 + 32960

// export const APE_CREATOR = "69JUqMCBEyKBppr4zwGAM9HTQ8JtUwWE2vdQQShWQExH";
// export const APE_CREATOR = "E5GSUDTQAvJouZkxHFGMA3THVzXWvrs4hRZEag2au3k6";
export const PUBLISH_NETWORK = "mainnet";

export const REWARD_TOKEN_MINT = new PublicKey(
  "FpDMF9oyH95csNptj4JQDAC6kwcp3shquY8q5ZirsxTk"
);
export const COLLECTION = "8Gg9hJVXU3gDCC2Sv79ioq9FGSV7eeTxB79DG7vLoSch";
// export const REWARD_TOKEN_MINT = new PublicKey("CFt8zQNRUpK4Lxhgv64JgZ5giZ3VWXSceQr6yKh7VoFU");

export const DECIMALS = 1_000_000;
export const EPOCH = 1; // 86400 - 1 day
export const FACTOR = 125; // X 1.25 Reward
export const NORMAL_REWARD_AMOUNT = 116; // 10 $WHEY
export const LEGENDARY_REWARD_AMOUNT = 289; // 25 $WHEY
export const DIAMOND_REWARD_AMOUNT = 348; // 30 $WHEY

export const SHOW_REWARD_FIXED = 4;

export const solConnection = new web3.Connection(web3.clusterApiUrl("devnet"));
// export const solConnection = new web3.Connection(
//   " https://ssc-dao.genesysgo.net/"
// );
// export const solConnection = new web3.Connection("https://rpc.ankr.com/solana");
// export const solConnection = new web3.Connection("https://api.metaplex.solana.com/");
// export const solConnection = new web3.Connection("https://slope.rpcpool.com/");
// export const solConnection = new web3.Connection("https://solana-mainnet.phantom.tech/");
// export const solConnection = new web3.Connection("https://mainnet-beta.solflare.network");
// export const solConnection = new web3.Connection("https://a2-mind-prd-api.azurewebsites.net/rpc");
export const METAPLEX = new web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const SHRED_BACKEND_API_URL = "https://sagc-holders-api.herokuapp.com";
