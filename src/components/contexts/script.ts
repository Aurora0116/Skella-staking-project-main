/* eslint-disable import/first */
import * as anchor from "@project-serum/anchor";
// import { programs } from "@metaplex/js";
import {
  // Keypair,
  PublicKey,
  SystemProgram,
  // SYSVAR_RENT_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { programs } from "@metaplex/js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

import {
  GLOBAL_AUTHORITY_SEED,
  MAX_WINNERS,
  METAPLEX,
  PROGRAM_ID,
  RAFFLE_POOL_SIZE,
  REWARD_TOKEN_MINT,
  solConnection,
  USER_POOL_SEED,
  USER_POOL_SIZE,
} from "../../config";
import { IDL } from "./Skella_IDL";

import { GlobalPool, UserPool } from "./type";
import { WalletContextState } from "@solana/wallet-adapter-react";
//Type
// import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
// import { useAuthorityRecordBeet } from "@metaplex-foundation/mpl-token-metadata";

// Generate the program client from IDL.
// program = new anchor.Program(idl, programId);
// console.log("ProgramId: ", program.programId.toBase58());

// Add a member to the whitelist(admin)
export const addToWhitelist = async (
  wallet: WalletContextState,
  member: PublicKey
) => {
  if (!wallet.publicKey) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    const tx = new Transaction();

    tx.add(
      program.instruction.addToWhitelist(bump, member, {
        accounts: {
          admin: wallet.publicKey,
          globalAuthority,
        },
        signers: [],
      })
    );

    const txID = await wallet.sendTransaction(tx, solConnection);
    await solConnection.confirmTransaction(txID, "confirmed");

    console.log("txID  >>", txID);
  } catch (error) {
    console.log("addToWhitelist Error >>", error);
  }
};

//Remove a member from the whitelist
export const removeFromWhitelist = async (
  wallet: WalletContextState,
  member: PublicKey
) => {
  if (!wallet.publicKey) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    const tx = new Transaction();

    tx.add(
      program.instruction.removeFromWhitelist(bump, member, {
        accounts: {
          admin: wallet.publicKey,
          globalAuthority,
        },
        signers: [],
      })
    );
    const txId = await wallet.sendTransaction(tx, solConnection);
    await solConnection.confirmTransaction(txId, "confirmed");

    console.log("txID >>", txId);
  } catch (error) {
    console.log("removeFromWhitelist Error >>", error);
  }
};

//Get GlobalAutority State
export const getGlobalAutority = async () => {
  let cloneWindow: any = window;

  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );

  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  const [globalAuthority] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );
  return globalAuthority;
};

// Get GlobalPool State
export const getGlobalState = async (): Promise<GlobalPool | null> => {
  let cloneWindow: any = window;

  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );

  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  const [globalAuthority] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );

  try {
    let globalState = await program.account.globalPool.fetch(globalAuthority);
    return globalState as unknown as GlobalPool;
  } catch {
    return null;
  }
};

// Get UserPool State
export const getUserPoolState = async (
  wallet: WalletContextState
): Promise<UserPool | null> => {
  if (!wallet.publicKey) return null;

  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solanan"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  let userPoolKey = await PublicKey.createWithSeed(
    wallet.publicKey,
    USER_POOL_SEED,
    program.programId
  );

  try {
    const state = await solConnection.getAccountInfo(userPoolKey);
    if (state) {
      let poolState = await program.account.userPool.fetch(userPoolKey);
      return poolState as unknown as UserPool;
    }
    return null;
  } catch (error) {
    console.log("getUserPoolState Error >>", error);
    return null;
  }
};

// Get NFTs in your wallet
export const getMyNft = async (wallet: WalletContextState) => {
  if (!wallet.publicKey) return;
  let tokenAccounts = await getParsedNftAccountsByOwner({
    publicAddress: wallet.publicKey.toBase58(),
    connection: solConnection,
  });
  return tokenAccounts;
};

// Normal staking NFT
export const stakeNft = async (
  wallet: WalletContextState,
  nfts: { mint: PublicKey }[],
  startLoading: Function,
  endLoading: Function,
  updatePageStates: Function
) => {
  startLoading();
  if (!wallet.publicKey) return;
  /* -------------- Prevention of Hacking -----------------  */
  // for (let nft of nfts) {

  // }
  // let userTokenAccount = await getAssociatedTokenAccount(
  //   wallet.publicKey,
  //   mint
  // );
  // let accountOfNFT = await getNFTTokenAccount(mint);

  // if (userTokenAccount.toBase58() !== accountOfNFT.toBase58()) {
  //   let ownerOfNAFT = await getOwnerOfNFT(mint);
  //   if (ownerOfNAFT.toBase58() === wallet.publicKey.toBase58()) {
  //     userTokenAccount = accountOfNFT;
  //   } else {
  //     console.log("NFT is not owned by this wallet.");
  //     return;
  //   }
  // }
  /* --------------------------------------------------------- */
  const cloneWindow: any = window;

  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );

  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );

  try {
    const userPoolKey = await PublicKey.createWithSeed(
      wallet.publicKey,
      USER_POOL_SEED,
      program.programId
    );

    const poolAccount = await solConnection.getAccountInfo(userPoolKey);
    if (poolAccount === null || poolAccount.data === null) {
      await initUserPool(wallet);
    }

    let transactions: Transaction[] = [];

    for (let nft of nfts) {
      const userTokenAccount = await getAssociatedTokenAccount(
        wallet.publicKey,
        nft.mint
      );
      const accountOfNFT = await getNFTTokenAccount(nft.mint);
      if (userTokenAccount.toBase58() !== accountOfNFT.toBase58()) {
        console.log("Error: Nft is not owned by user");
        endLoading();
        return;
      }

      const { instructions, destinationAccounts } =
        await getATokenAccountsNeedCreate(
          solConnection,
          wallet.publicKey,
          globalAuthority,
          [nft.mint]
        );

      const metadata = await getMetadataAddress(nft.mint);

      let tx = new Transaction();
      if (instructions.length > 0) tx.add(instructions[0]);
      tx.add(
        program.instruction.stakeNft(bump, {
          accounts: {
            owner: wallet.publicKey,
            globalAuthority,
            userPool: userPoolKey,
            nftMint: nft.mint,
            userTokenAccount,
            destTokenAccount: destinationAccounts[0],
            mintMetadata: metadata,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: METAPLEX,
          },
          instructions: [],
          signers: [],
        })
      );
      transactions.push(tx);
    }
    let { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
      endLoading();
      updatePageStates();
    }
  } catch (error) {
    endLoading();
    console.log("stakeNft Error >>", error);
  }
};

// Unstake NFT in UserPool
export const withdrawNft = async (
  wallet: WalletContextState,
  nfts: { mint: PublicKey }[],
  startLoading: Function,
  endLoading: Function,
  updatePageStates: Function
) => {
  startLoading();
  if (!wallet.publicKey) return;

  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    let userPoolKey = await PublicKey.createWithSeed(
      wallet.publicKey,
      USER_POOL_SEED,
      program.programId
    );

    let transactions: Transaction[] = [];

    for (let nft of nfts) {
      let ret = await getATokenAccountsNeedCreate(
        solConnection,
        wallet.publicKey,
        wallet.publicKey,
        [nft.mint]
      );

      let userTokenAccount = ret.destinationAccounts[0];

      let { destinationAccounts } = await getATokenAccountsNeedCreate(
        solConnection,
        wallet.publicKey,
        globalAuthority,
        [nft.mint]
      );

      const tx = new Transaction();
      if (ret.instructions.length > 0) tx.add(ret.instructions[0]);

      tx.add(
        program.instruction.withdrawNormalNft(bump, {
          accounts: {
            owner: wallet.publicKey,
            userPool: userPoolKey,
            globalAuthority,
            userTokenAccount,
            destTokenAccount: destinationAccounts[0],
            nftMint: nft.mint,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
          instructions: [],
          signers: [],
        })
      );
      transactions.push(tx);
    }
    let { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
      endLoading();
      updatePageStates();
    }
  } catch (error) {
    endLoading();
    console.log("withdrawNft Error >>", error);
  }
};

//Withdraw NFT from Gamified Staking
export const withdrawGameNft = async (
  wallet: WalletContextState,
  nfts: { mint: PublicKey }[],
  raffleSeed: string,
  startLoading: Function,
  endLoading: Function,
  updatePageStates: Function
) => {
  startLoading();
  if (!wallet.publicKey) return;

  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    const raffle = await PublicKey.createWithSeed(
      wallet.publicKey,
      raffleSeed,
      program.programId
    );

    const userPoolKey = await PublicKey.createWithSeed(
      wallet.publicKey,
      USER_POOL_SEED,
      program.programId
    );

    let transactions: Transaction[] = [];

    for (let nft of nfts) {
      const ret = await getATokenAccountsNeedCreate(
        solConnection,
        wallet.publicKey,
        wallet.publicKey,
        [nft.mint]
      );

      const userTokenAccount = ret.destinationAccounts[0];

      const { instructions, destinationAccounts } =
        await getATokenAccountsNeedCreate(
          solConnection,
          wallet.publicKey,
          globalAuthority,
          [nft.mint]
        );

      const tx = new Transaction();
      if (instructions.length > 0) tx.add(instructions[0]);

      tx.add(
        program.instruction.withdrawGameNft(bump, {
          accounts: {
            buyer: wallet.publicKey,
            userPool: userPoolKey,
            raffle,
            globalAuthority,
            userTokenAccount,
            destTokenAccount: destinationAccounts[0],
            nftMint: nft.mint,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
          instructions: [],
          signers: [],
        })
      );
      transactions.push(tx);
    }

    const { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
      endLoading();
      updatePageStates();
    }
  } catch (error) {
    endLoading();
    console.log("withdrawGameNft Error >> ", error);
  }
};

//Initialize the global pool
// export const initGlobalPool = async () => {
//   const [globalAuthority, bump] = await PublicKey.findProgramAddress(
//     [Buffer.from(GLOBAL_AUTHORITY_SEED)],
//     program.programId
//   );

//   const tx = await program.rpc.initialize(bump, {
//     accounts: {
//       admin: userAddress,
//       globalAuthority,
//       systemProgram: SystemProgram.programId,
//       rent: SYSVAR_RENT_PUBKEY,
//     },
//     instructions: [],
//     signers: [],
//   });

//   await solConnection.confirmTransaction(tx, "confirmed");
//   console.log("txHash = ", tx);
// };

//Initialize Userpool according to the user
export const initUserPool = async (wallet: WalletContextState) => {
  if (!wallet.publicKey) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solanan"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    let userPoolKey = await PublicKey.createWithSeed(
      wallet.publicKey,
      USER_POOL_SEED,
      program.programId
    );

    let ix = SystemProgram.createAccountWithSeed({
      fromPubkey: wallet.publicKey,
      basePubkey: wallet.publicKey,
      seed: USER_POOL_SEED,
      newAccountPubkey: userPoolKey,
      lamports: await solConnection.getMinimumBalanceForRentExemption(
        USER_POOL_SIZE
      ),
      space: USER_POOL_SIZE,
      programId: program.programId,
    });

    const tx = new Transaction();
    tx.add(ix);
    tx.add(
      program.instruction.initializeUserPool({
        accounts: {
          userPool: userPoolKey,
          owner: wallet.publicKey,
        },
        instructions: [],
        signers: [],
      })
    );

    const txId = await wallet.sendTransaction(tx, solConnection);

    await solConnection.confirmTransaction(txId, "finalized");

    console.log("txID >>", txId);
  } catch (error) {
    console.log("initUserPool Error >>", error);
  }
};

//Create Raffel in term of day
//Parameter
//period: millisecond of days
//startTime: millisecond of now + millisecond of during time
export const createRaffle = async (
  startTime: number,
  datas: { period: number; raffleSeed: string }[],
  maxEntrants: number,
  wallet: WalletContextState
  // rewardToken,
) => {
  if (!wallet.publicKey) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    let transactions: Transaction[] = [];

    for (let data of datas) {
      let raffle = await PublicKey.createWithSeed(
        wallet.publicKey,
        data.raffleSeed,
        program.programId
      );

      let rafflePoolInfo = await solConnection.getAccountInfo(raffle);

      const tx = new Transaction();
      if (!rafflePoolInfo) {
        let createRafflePoolIx = SystemProgram.createAccountWithSeed({
          fromPubkey: wallet.publicKey,
          basePubkey: wallet.publicKey,
          seed: data.raffleSeed,
          newAccountPubkey: raffle,
          lamports: await solConnection.getMinimumBalanceForRentExemption(
            RAFFLE_POOL_SIZE
          ),
          space: RAFFLE_POOL_SIZE,
          programId: program.programId,
        });
        tx.add(createRafflePoolIx);
      }

      tx.add(
        program.instruction.createRaffle(
          bump,
          new anchor.BN(startTime / 1000),
          new anchor.BN(data.period),
          new anchor.BN(maxEntrants),
          {
            accounts: {
              admin: wallet.publicKey,
              globalAuthority,
              raffle,
            },
            instructions: [],
            signers: [],
          }
        )
      );
      transactions.push(tx);
    }

    let { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
    }
  } catch (error) {
    console.log("createRaffle Error >>", error);
  }
};

//Get RafflePool state
export const getRafflePoolState = async (
  raffleSeed: string,
  wallet: PublicKey
) => {
  if (!wallet) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
  try {
    let raffle = await PublicKey.createWithSeed(
      wallet,
      raffleSeed,
      program.programId
    );

    const state = await solConnection.getAccountInfo(raffle);
    if (state) {
      let rafflePoolData = await program.account.rafflePool.fetch(raffle);
      return { pool: rafflePoolData, id: raffle };
    }
    return null;
  } catch (error) {
    console.log("getRafflePoolState Error >> Didn't create Raffle");
  }
};

//Get RafflePool information
export const getRafflePoolInformation = async (raffleKey: PublicKey) => {
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
  try {
    const state = await solConnection.getAccountInfo(raffleKey);
    if (state) {
      let rafflePoolData = await program.account.rafflePool.fetch(raffleKey);
      return rafflePoolData;
    }
    return null;
  } catch (error) {
    console.log("getRafflePoolInformation Error >> Didn't create Raffle");
  }
};

//Add Reward by the creator of raffle
export const addReward = async (
  datas: { raffleSeed: string; tokenMint: PublicKey; tokenAmount: number }[],
  wallet: WalletContextState
) => {
  if (!wallet.publicKey) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    let transactions: Transaction[] = [];
    console.log(datas.length);

    for (let data of datas) {
      let raffle = await PublicKey.createWithSeed(
        wallet.publicKey,
        data.raffleSeed,
        program.programId
      );

      let userTokenAccount = await getAssociatedTokenAccount(
        wallet.publicKey,
        data.tokenMint
      );

      let { instructions, destinationAccounts } =
        await getATokenAccountsNeedCreate(
          solConnection,
          wallet.publicKey,
          globalAuthority,
          [data.tokenMint]
        );

      const tx = new Transaction();
      if (instructions.length > 0) tx.add(instructions[0]);

      tx.add(
        program.instruction.addReward(bump, new anchor.BN(data.tokenAmount), {
          accounts: {
            admin: wallet.publicKey,
            globalAuthority,
            raffle,
            tokenMint: data.tokenMint,
            userTokenAccount,
            destTokenAccount: destinationAccounts[0],
            tokenProgram: TOKEN_PROGRAM_ID,
          },
          instructions: [],
          signers: [],
        })
      );
      transactions.push(tx);
    }
    let { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
    }
  } catch (error) {
    console.log("addReward Error  >>", error);
  }
};

//Remove Reward by the creator of raffle
export const removeReward = async (
  datas: { raffleSeed: string; tokenMint: PublicKey; tokenAmount: number }[],
  wallet: WalletContextState
) => {
  if (!wallet.publicKey) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );
  try {
    let transactions: Transaction[] = [];
    for (let data of datas) {
      let raffle = await PublicKey.createWithSeed(
        wallet.publicKey,
        data.raffleSeed,
        program.programId
      );

      let userTokenAccount = await getAssociatedTokenAccount(
        wallet.publicKey,
        data.tokenMint
      );
      let destTokenAccount = await getAssociatedTokenAccount(
        globalAuthority,
        data.tokenMint
      );

      let tx = new Transaction();

      tx.add(
        program.instruction.removeReward(
          bump,
          new anchor.BN(data.tokenAmount),
          {
            accounts: {
              admin: wallet.publicKey,
              globalAuthority,
              raffle,
              tokenMint: data.tokenMint,
              userTokenAccount,
              destTokenAccount,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
            instructions: [],
            signers: [],
          }
        )
      );
      transactions.push(tx);
    }
    let { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
    }
  } catch (error) {
    console.log("removeReward Error >>", error);
  }
};

//Update Raffle Period
export const updateRafflePeriod = async (
  datas: { raffleSeed: string; period: number }[],
  startTime: number,
  wallet: WalletContextState
) => {
  if (!wallet.publicKey) return;
  let cloneWindow: any = window;

  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );

  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    let transactions: Transaction[] = [];
    for (let data of datas) {
      let raffle = await PublicKey.createWithSeed(
        wallet.publicKey,
        data.raffleSeed,
        program.programId
      );

      const tx = new Transaction();

      tx.add(
        program.instruction.updateRafflePeriod(
          new anchor.BN(startTime / 1000),
          new anchor.BN(data.period),
          {
            accounts: {
              admin: wallet.publicKey,
              raffle,
            },
            instructions: [],
            signers: [],
          }
        )
      );
      transactions.push(tx);
    }
    let { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
    }
  } catch (error) {
    console.log("updateRafflePeriod Error >>", error);
  }
};

//Stop Raffle
export const stopRaffle = async (
  wallet: WalletContextState,
  datas: { raffleSeed: string }[]
) => {
  if (!wallet.publicKey) return;
  let cloneWindow: any = window;

  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );

  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    let transactions: Transaction[] = [];
    for (let data of datas) {
      let raffle = await PublicKey.createWithSeed(
        wallet.publicKey,
        data.raffleSeed,
        program.programId
      );

      let tx = new Transaction();

      tx.add(
        program.instruction.stopRaffle({
          accounts: {
            admin: wallet.publicKey,
            raffle,
          },
          instructions: [],
          signers: [],
        })
      );
      transactions.push(tx);
    }
    let { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );
    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
    }
  } catch (error) {
    console.log("stopRaffle Error >>", error);
  }
};

export const claimReward = async (wallet: WalletContextState) => {
  if (!wallet.publicKey) return;
  let cloneWindow: any = window;

  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );

  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );

  const userPoolKey = await PublicKey.createWithSeed(
    wallet.publicKey,
    USER_POOL_SEED,
    program.programId
  );

  try {
    const { instructions, destinationAccounts } =
      await getATokenAccountsNeedCreate(
        solConnection,
        wallet.publicKey,
        wallet.publicKey,
        [REWARD_TOKEN_MINT]
      );

    const rewardVault = await getAssociatedTokenAccount(
      globalAuthority,
      REWARD_TOKEN_MINT
    );

    const tx = new Transaction();

    if (instructions.length > 0) tx.add(instructions[0]);

    tx.add(
      program.instruction.claimReward(bump, {
        accounts: {
          owner: wallet.publicKey,
          userPool: userPoolKey,
          globalAuthority,
          rewardVault,
          userRewardAccount: destinationAccounts[0],
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        instructions: [],
        signers: [],
      })
    );
    const txId = await wallet.sendTransaction(tx, solConnection);
    await solConnection.confirmTransaction(txId, "finalized");
    console.log("txId >>", txId);
  } catch (error) {
    console.log("claimReward Error >>", error);
  }
};

// Get Reward Data
export const getRewardData = async (raffle: PublicKey) => {
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  const rafflePoolData = await program.account.rafflePool.fetch(raffle);
  let tokens = [];
  let amounts = [];
  for (let i = 0; i < Number(rafflePoolData.winnerCount); i++) {
    tokens.push(rafflePoolData.rewardTokenAddress[i].tokenAddress.toBase58());
    amounts.push(Number(rafflePoolData.rewardTokenAddress[i].amount));
  }
  return { tokens: tokens, amounts: amounts };
};

//Conduct Gamified Staking for the Specific Raffle
export const gameNftStaking = async (
  wallet: WalletContextState,
  nfts: { mint: PublicKey }[],
  raffle: PublicKey,
  startLoading: Function,
  endLoading: Function,
  updatePageStates: Function
) => {
  startLoading();
  if (!wallet.publicKey) return;
  /* -------------- Prevention of Hacking -----------------  */
  /* --------------------------------------------------------- */

  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    // let rafflePoolData = await program.account.rafflePool.fetch(raffle);

    const userPoolKey = await PublicKey.createWithSeed(
      wallet.publicKey,
      USER_POOL_SEED,
      program.programId
    );
    // let userPoolData = await program.account.userPool.fetch(userPoolKey);
    // console.log("******", userPoolData);

    const poolAccount = await solConnection.getAccountInfo(userPoolKey);
    if (poolAccount === null || poolAccount.data === null) {
      await initUserPool(wallet);
    }

    let transactions: Transaction[] = [];

    for (let nft of nfts) {
      const userTokenAccount = await getAssociatedTokenAccount(
        wallet.publicKey,
        nft.mint
      );
      const accountOfNFT = await getNFTTokenAccount(nft.mint);
      if (userTokenAccount.toBase58() !== accountOfNFT.toBase58()) {
        console.log("Error: Nft is not owned by user");
        endLoading();
        return;
      }

      const { instructions, destinationAccounts } =
        await getATokenAccountsNeedCreate(
          solConnection,
          wallet.publicKey,
          globalAuthority,
          [nft.mint]
        );

      const metadata = await getMetadataAddress(nft.mint);

      const tx = new Transaction();
      if (instructions.length > 0) tx.add(instructions[0]);

      tx.add(
        program.instruction.gamifiedNftStaking(bump, {
          accounts: {
            buyer: wallet.publicKey,
            globalAuthority,
            userPool: userPoolKey,
            raffle,
            nftMint: nft.mint,
            userTokenAccount,
            destTokenAccount: destinationAccounts[0],
            mintMetadata: metadata,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: METAPLEX,
          },
          instructions: [],
          signers: [],
        })
      );

      transactions.push(tx);
    }

    const { blockhash } = await provider.connection.getRecentBlockhash(
      "confirmed"
    );

    transactions.forEach((transaction) => {
      transaction.feePayer = wallet.publicKey as PublicKey;
      transaction.recentBlockhash = blockhash;
    });

    if (wallet.signAllTransactions !== undefined) {
      const signedTransactions = await wallet.signAllTransactions(transactions);

      let signatures = await Promise.all(
        signedTransactions.map((transaction) =>
          provider.connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          })
        )
      );

      await Promise.all(
        signatures.map((signature) =>
          provider.connection.confirmTransaction(signature, "finalized")
        )
      );
      console.log("Transaction is Confirmed!");
      endLoading();
      updatePageStates();
    }
  } catch (error) {
    endLoading();
    console.log("gameNftStaking >>", error);
  }
};

//Reveal Winner
export const revealWinner = async (
  raffle: PublicKey,
  wallet: WalletContextState
) => {
  if (!wallet.publicKey) return;
  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const tx = new Transaction();

    tx.add(
      program.instruction.revealWinner({
        accounts: {
          buyer: wallet.publicKey,
          raffle,
        },
        instructions: [],
        signers: [],
      })
    );
    const txId = await wallet.sendTransaction(tx, solConnection);
    await solConnection.confirmTransaction(txId, "finalized");
    console.log("txId >>", txId);
  } catch (error) {
    console.log("revealWinner Error >>", error);
  }
};

//Claim Raffle Reward by Winner
export const claimRaffleReward = async (
  raffle: string,
  wallet: WalletContextState
) => {
  if (!wallet.publicKey) return;

  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    let rafflePoolData = await program.account.rafflePool.fetch(raffle);

    let index = 0;
    for (let i = 0; i < Number(rafflePoolData.winnerCount); i++) {
      if (
        rafflePoolData.winners[i].toBase58() === wallet.publicKey.toBase58()
      ) {
        index = i;
        break;
      }
    }
    let rewardToken = rafflePoolData.rewardTokenAddress[index].tokenAddress;
    let rewardAmount = rafflePoolData.rewardTokenAddress[index].amount;

    let { instructions, destinationAccounts } =
      await getATokenAccountsNeedCreate(
        solConnection,
        wallet.publicKey,
        wallet.publicKey,
        [rewardToken]
      );
    let srcNftTokenAccount = await getAssociatedTokenAccount(
      globalAuthority,
      rewardToken
    );

    const tx = new Transaction();

    if (instructions.length > 0) tx.add(instructions[0]);

    tx.add(
      program.instruction.claimRaffleReward(bump, rewardAmount, {
        accounts: {
          claimer: wallet.publicKey,
          globalAuthority,
          raffle,
          claimerNftTokenAccount: destinationAccounts[0],
          srcNftTokenAccount,
          tokenMint: rewardToken,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        instructions: [],
        signers: [],
      })
    );
    const txId = await wallet.sendTransaction(tx, solConnection);
    await solConnection.confirmTransaction(txId, "finalized");
    console.log("txId >>", txId);
  } catch (error) {
    console.log("claimRaffleReward Error >>", error);
  }
};

//Withdraw Reward Token after the raffle is ended for admin
export const withdrawRewardNft = async (
  wallet: WalletContextState,
  rewardMint: PublicKey,
  raffleSeed: string
) => {
  if (!wallet.publicKey) return;

  const cloneWindow: any = window;
  const provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  try {
    const [globalAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    let raffle = await PublicKey.createWithSeed(
      wallet.publicKey,
      raffleSeed,
      program.programId
    );
    let rafflePoolData = await program.account.rafflePool.fetch(raffle);
    // console.log("=======", rafflePoolData);
    // let index: number;
    let tokenAmount;
    for (let i = 0; i < MAX_WINNERS; i++) {
      if (
        rafflePoolData.rewardTokenAddress[i].tokenAddress.toBase58() ===
        rewardMint.toBase58()
      ) {
        tokenAmount = rafflePoolData.rewardTokenAddress[i].amount;
        break;
      }
    }
    // console.log("@@@@@@@", Number(tokenAmount));
    if (tokenAmount === undefined) {
      console.log("There is no such a token!");
      return;
    }

    let ownerNftTokenAccount: PublicKey = await getAssociatedTokenAccount(
      wallet.publicKey,
      rewardMint
    );
    let srcNftTokenAccount: PublicKey = await getAssociatedTokenAccount(
      globalAuthority,
      rewardMint
    );

    const tx = new Transaction();

    tx.add(
      program.instruction.withdrawRewardNft(bump, tokenAmount, {
        accounts: {
          owner: wallet.publicKey,
          globalAuthority,
          raffle,
          ownerNftTokenAccount,
          srcNftTokenAccount,
          nftMint: rewardMint,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        instructions: [],
        signers: [],
      })
    );
    const txId = await wallet.sendTransaction(tx, solConnection);
    await solConnection.confirmTransaction(txId, "singleGossip");
    console.log("txId >>", txId);
  } catch (error) {
    console.log("withdrawRewardNft Error >>", error);
  }
};

/*
 *Define affiliated functions
 */

// const getOwnerOfNFT = async (nftMintPk: PublicKey): Promise<PublicKey> => {
//   let tokenAccountPK = await getNFTTokenAccount(nftMintPk);
//   let tokenAccountInfo = await solConnection.getAccountInfo(tokenAccountPK);

//   if (tokenAccountInfo && tokenAccountInfo.data) {
//     let ownerPubkey = new PublicKey(tokenAccountInfo.data.slice(32, 64));
//     return ownerPubkey;
//   }
//   return new PublicKey("");
// };

const getNFTTokenAccount = async (nftMintPk: PublicKey): Promise<PublicKey> => {
  // console.log("getNFTTokenAccount nftMintPk=", nftMintPk.toBase58());
  let tokenAccount = await solConnection.getProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: [
      {
        dataSize: 165,
      },
      {
        memcmp: {
          offset: 64,
          bytes: "2",
        },
      },
      {
        memcmp: {
          offset: 0,
          bytes: nftMintPk.toBase58(),
        },
      },
    ],
  });
  return tokenAccount[0].pubkey;
};

const getAssociatedTokenAccount = async (
  ownerPubkey: PublicKey,
  mintPk: PublicKey
): Promise<PublicKey> => {
  let associatedTokenAccountPubkey = (
    await PublicKey.findProgramAddress(
      [
        ownerPubkey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mintPk.toBuffer(), // mint address
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];
  return associatedTokenAccountPubkey;
};

export const getATokenAccountsNeedCreate = async (
  connection: anchor.web3.Connection,
  walletAddress: anchor.web3.PublicKey,
  owner: anchor.web3.PublicKey,
  nfts: anchor.web3.PublicKey[]
) => {
  let instructions = [],
    destinationAccounts = [];
  for (const mint of nfts) {
    const destinationPubkey = await getAssociatedTokenAccount(owner, mint);
    let response = await connection.getAccountInfo(destinationPubkey);
    if (!response) {
      const createATAIx = createAssociatedTokenAccountInstruction(
        destinationPubkey,
        walletAddress,
        owner,
        mint
      );
      instructions.push(createATAIx);
    }
    destinationAccounts.push(destinationPubkey);
    // if (walletAddress !== owner) {
    //   const userAccount = await getAssociatedTokenAccount(walletAddress, mint);
    //   response = await connection.getAccountInfo(userAccount);
    //   if (!response) {
    //     const createATAIx = createAssociatedTokenAccountInstruction(
    //       userAccount,
    //       walletAddress,
    //       walletAddress,
    //       mint
    //     );
    //     instructions.push(createATAIx);
    //   }
    // }
  }
  return {
    instructions,
    destinationAccounts,
  };
};

export const createAssociatedTokenAccountInstruction = (
  associatedTokenAddress: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  walletAddress: anchor.web3.PublicKey,
  splTokenMintAddress: anchor.web3.PublicKey
) => {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
    { pubkey: walletAddress, isSigner: false, isWritable: false },
    { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new anchor.web3.TransactionInstruction({
    keys,
    programId: ASSOCIATED_TOKEN_PROGRAM_ID,
    data: Buffer.from([]),
  });
};

/** Get metaplex mint metadata account address */
export const getMetadataAddress = async (
  mint: PublicKey
): Promise<PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("metadata"), METAPLEX.toBuffer(), mint.toBuffer()],
      METAPLEX
    )
  )[0];
};

// Get metaplex mint metadata
export const getNftMetaData = async (nftMintPk: PublicKey) => {
  let {
    metadata: { Metadata },
  } = programs;
  let metadataAccount = await Metadata.getPDA(nftMintPk);
  const metadat = await Metadata.load(solConnection, metadataAccount);
  return metadat;
};
