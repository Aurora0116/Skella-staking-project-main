import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export interface GlobalPool {
    superAdmin: PublicKey,
    totalStakedCount: anchor.BN,
    whitelistedCount: anchor.BN,
    whitelist: PublicKey[],
}

export interface RewardData {
    tokenAddress: PublicKey,
    amount: anchor.BN,
}

export interface RafflePool {
    creator: PublicKey,
    rewardTokenAddress: RewardData[],
    entrantCount: anchor.BN,
    noRepeatEntrant: anchor.BN,
    startTimestamp: anchor.BN,
    endTimestamp: anchor.BN,
    entrants: PublicKey[],
    winners: PublicKey[],
    winnerCount: anchor.BN,
    claimedWinner: anchor.BN[],
    winnerIndex: anchor.BN[],
    maxEntrants: anchor.BN,
}

export interface StakedData {
    mint: PublicKey,
    stakedTime: anchor.BN,
    raffleAddress: PublicKey
}

export interface UserPool {
    owner: PublicKey,
    lastRewardTime: anchor.BN,
    pendingReward: anchor.BN,
    stakedCount: anchor.BN,
    stakedNfts: StakedData[],
}