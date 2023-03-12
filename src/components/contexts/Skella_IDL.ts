export type Skella = {
  version: "0.1.0";
  name: "good_skellas_contract";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        }
      ];
    },
    {
      name: "initializeUserPool";
      accounts: [
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "addToWhitelist";
      accounts: [
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        },
        {
          name: "address";
          type: "publicKey";
        }
      ];
    },
    {
      name: "removeFromWhitelist";
      accounts: [
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        },
        {
          name: "address";
          type: "publicKey";
        }
      ];
    },
    {
      name: "createRaffle";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        },
        {
          name: "startTimestamp";
          type: "i64";
        },
        {
          name: "period";
          type: "i64";
        },
        {
          name: "maxEntrants";
          type: "u64";
        }
      ];
    },
    {
      name: "addReward";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        },
        {
          name: "tokenAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "removeReward";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        },
        {
          name: "tokenAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "updateRafflePeriod";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "startTimestamp";
          type: "i64";
        },
        {
          name: "period";
          type: "i64";
        }
      ];
    },
    {
      name: "stopRaffle";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "stakeNft";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenMetadataProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        }
      ];
    },
    {
      name: "claimReward";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rewardVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userRewardAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        }
      ];
    },
    {
      name: "withdrawNormalNft";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        }
      ];
    },
    {
      name: "gamifiedNftStaking";
      accounts: [
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenMetadataProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        }
      ];
    },
    {
      name: "withdrawGameNft";
      accounts: [
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        }
      ];
    },
    {
      name: "revealWinner";
      accounts: [
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "claimRaffleReward";
      accounts: [
        {
          name: "claimer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        },
        {
          name: "claimerNftTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "srcNftTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawRewardNft";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "raffle";
          isMut: true;
          isSigner: false;
        },
        {
          name: "ownerNftTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "srcNftTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "globalBump";
          type: "u8";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "GlobalPool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "superAdmin";
            type: "publicKey";
          },
          {
            name: "totalStakedCount";
            type: "u64";
          },
          {
            name: "whitelistedCount";
            type: "u64";
          },
          {
            name: "whitelist";
            type: {
              array: ["publicKey", 10];
            };
          }
        ];
      };
    },
    {
      name: "RafflePool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "rewardTokenAddress";
            type: {
              array: [
                {
                  defined: "RewardData";
                },
                10
              ];
            };
          },
          {
            name: "entrantCount";
            type: "u64";
          },
          {
            name: "noRepeatEntrant";
            type: "u64";
          },
          {
            name: "startTimestamp";
            type: "i64";
          },
          {
            name: "endTimestamp";
            type: "i64";
          },
          {
            name: "entrants";
            type: {
              array: ["publicKey", 1000];
            };
          },
          {
            name: "winners";
            type: {
              array: ["publicKey", 10];
            };
          },
          {
            name: "winnerCount";
            type: "u64";
          },
          {
            name: "claimedWinner";
            type: {
              array: ["u64", 10];
            };
          },
          {
            name: "winnerIndex";
            type: {
              array: ["u64", 10];
            };
          },
          {
            name: "maxEntrants";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "UserPool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "lastRewardTime";
            type: "i64";
          },
          {
            name: "pendingReward";
            type: "u64";
          },
          {
            name: "stakedCount";
            type: "u64";
          },
          {
            name: "stakedNfts";
            type: {
              array: [
                {
                  defined: "StakedData";
                },
                100
              ];
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "RewardData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokenAddress";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "StakedData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "stakedTime";
            type: "i64";
          },
          {
            name: "raffleAddress";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidSuperOwner";
      msg: "Invalid Superowner!";
    },
    {
      code: 6001;
      name: "InvalidAddRequest";
      msg: "This guy already exists in the whitelist!";
    },
    {
      code: 6002;
      name: "InvalidRemoveRequest";
      msg: "This guy doesn't exist in the whitelist!";
    },
    {
      code: 6003;
      name: "MaxEntrantsTooLarge";
      msg: "Max entrants is too large";
    },
    {
      code: 6004;
      name: "RaffleEnded";
      msg: "Raffle has ended";
    },
    {
      code: 6005;
      name: "InvalidMetadata";
      msg: "Invalid NFT Metadata";
    },
    {
      code: 6006;
      name: "NotGameStakingPeriod";
      msg: "NotGameStakingPeriod";
    },
    {
      code: 6007;
      name: "UnkownOrNotAllowedNFTCollection";
      msg: "Unknown or not allowed NFT collection";
    },
    {
      code: 6008;
      name: "MetadataCreatorParseError";
      msg: "Faild to parse metadata information";
    },
    {
      code: 6009;
      name: "InvalidNftAddress";
      msg: "Invalid NFT address";
    },
    {
      code: 6010;
      name: "InvalidUserPool";
      msg: "Invalid User Pool";
    },
    {
      code: 6011;
      name: "InsufficientRewardVault";
      msg: "Insufficient Reward in the vault";
    },
    {
      code: 6012;
      name: "InvalidWithdrawRequest";
      msg: "No NFT in the gamified staking";
    },
    {
      code: 6013;
      name: "ClaimPeriodOver";
      msg: "Claim period is over";
    },
    {
      code: 6014;
      name: "DuringClaimPeriod";
      msg: "Claim period is not over yet";
    },
    {
      code: 6015;
      name: "RaffleNotEnded";
      msg: "Raffle has not ended";
    },
    {
      code: 6016;
      name: "InvalidPrizeIndex";
      msg: "Invalid prize index";
    },
    {
      code: 6017;
      name: "StartTimeError";
      msg: "Invalid new Start time";
    },
    {
      code: 6018;
      name: "NoPrize";
      msg: "No prize";
    },
    {
      code: 6019;
      name: "NotCreator";
      msg: "You are not the Creator";
    },
    {
      code: 6020;
      name: "NotWinner";
      msg: "You are not the Winnner";
    },
    {
      code: 6021;
      name: "OtherEntrants";
      msg: "There are other Entrants";
    },
    {
      code: 6022;
      name: "InvalidCalculation";
      msg: "Invalid calculation";
    },
    {
      code: 6023;
      name: "NotEnoughToken";
      msg: "You don't have enough token";
    },
    {
      code: 6024;
      name: "NotEnoughSOL";
      msg: "You don't have enough SOL";
    },
    {
      code: 6025;
      name: "NotEnoughTicketsLeft";
      msg: "Not enough tickets left";
    },
    {
      code: 6026;
      name: "RaffleStillRunning";
      msg: "Raffle is still running";
    },
    {
      code: 6027;
      name: "WinnersAlreadyClaim";
      msg: "Winner already claimed";
    },
    {
      code: 6028;
      name: "WinnerNotDrawn";
      msg: "Winner not drawn";
    },
    {
      code: 6029;
      name: "InvalidRevealedData";
      msg: "Invalid revealed data";
    },
    {
      code: 6030;
      name: "TokenAccountNotOwnedByWinner";
      msg: "Ticket account not owned by winner";
    },
    {
      code: 6031;
      name: "TicketHasNotWon";
      msg: "Ticket has not won";
    },
    {
      code: 6032;
      name: "UnclaimedPrizes";
      msg: "Unclaimed prizes";
    },
    {
      code: 6033;
      name: "InvalidRecentBlockhashes";
      msg: "Invalid recent blockhashes";
    }
  ];
};

export const IDL: Skella = {
  version: "0.1.0",
  name: "good_skellas_contract",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
      ],
    },
    {
      name: "initializeUserPool",
      accounts: [
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "addToWhitelist",
      accounts: [
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
        {
          name: "address",
          type: "publicKey",
        },
      ],
    },
    {
      name: "removeFromWhitelist",
      accounts: [
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
        {
          name: "address",
          type: "publicKey",
        },
      ],
    },
    {
      name: "createRaffle",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
        {
          name: "startTimestamp",
          type: "i64",
        },
        {
          name: "period",
          type: "i64",
        },
        {
          name: "maxEntrants",
          type: "u64",
        },
      ],
    },
    {
      name: "addReward",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
        {
          name: "tokenAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "removeReward",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
        {
          name: "tokenAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "updateRafflePeriod",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "startTimestamp",
          type: "i64",
        },
        {
          name: "period",
          type: "i64",
        },
      ],
    },
    {
      name: "stopRaffle",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "stakeNft",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
      ],
    },
    {
      name: "claimReward",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userRewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
      ],
    },
    {
      name: "withdrawNormalNft",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
      ],
    },
    {
      name: "gamifiedNftStaking",
      accounts: [
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
      ],
    },
    {
      name: "withdrawGameNft",
      accounts: [
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
      ],
    },
    {
      name: "revealWinner",
      accounts: [
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claimRaffleReward",
      accounts: [
        {
          name: "claimer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
        {
          name: "claimerNftTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "srcNftTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawRewardNft",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "raffle",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ownerNftTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "srcNftTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "globalBump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "GlobalPool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "superAdmin",
            type: "publicKey",
          },
          {
            name: "totalStakedCount",
            type: "u64",
          },
          {
            name: "whitelistedCount",
            type: "u64",
          },
          {
            name: "whitelist",
            type: {
              array: ["publicKey", 10],
            },
          },
        ],
      },
    },
    {
      name: "RafflePool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "rewardTokenAddress",
            type: {
              array: [
                {
                  defined: "RewardData",
                },
                10,
              ],
            },
          },
          {
            name: "entrantCount",
            type: "u64",
          },
          {
            name: "noRepeatEntrant",
            type: "u64",
          },
          {
            name: "startTimestamp",
            type: "i64",
          },
          {
            name: "endTimestamp",
            type: "i64",
          },
          {
            name: "entrants",
            type: {
              array: ["publicKey", 1000],
            },
          },
          {
            name: "winners",
            type: {
              array: ["publicKey", 10],
            },
          },
          {
            name: "winnerCount",
            type: "u64",
          },
          {
            name: "claimedWinner",
            type: {
              array: ["u64", 10],
            },
          },
          {
            name: "winnerIndex",
            type: {
              array: ["u64", 10],
            },
          },
          {
            name: "maxEntrants",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UserPool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "lastRewardTime",
            type: "i64",
          },
          {
            name: "pendingReward",
            type: "u64",
          },
          {
            name: "stakedCount",
            type: "u64",
          },
          {
            name: "stakedNfts",
            type: {
              array: [
                {
                  defined: "StakedData",
                },
                100,
              ],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "RewardData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokenAddress",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "StakedData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "stakedTime",
            type: "i64",
          },
          {
            name: "raffleAddress",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidSuperOwner",
      msg: "Invalid Superowner!",
    },
    {
      code: 6001,
      name: "InvalidAddRequest",
      msg: "This guy already exists in the whitelist!",
    },
    {
      code: 6002,
      name: "InvalidRemoveRequest",
      msg: "This guy doesn't exist in the whitelist!",
    },
    {
      code: 6003,
      name: "MaxEntrantsTooLarge",
      msg: "Max entrants is too large",
    },
    {
      code: 6004,
      name: "RaffleEnded",
      msg: "Raffle has ended",
    },
    {
      code: 6005,
      name: "InvalidMetadata",
      msg: "Invalid NFT Metadata",
    },
    {
      code: 6006,
      name: "NotGameStakingPeriod",
      msg: "NotGameStakingPeriod",
    },
    {
      code: 6007,
      name: "UnkownOrNotAllowedNFTCollection",
      msg: "Unknown or not allowed NFT collection",
    },
    {
      code: 6008,
      name: "MetadataCreatorParseError",
      msg: "Faild to parse metadata information",
    },
    {
      code: 6009,
      name: "InvalidNftAddress",
      msg: "Invalid NFT address",
    },
    {
      code: 6010,
      name: "InvalidUserPool",
      msg: "Invalid User Pool",
    },
    {
      code: 6011,
      name: "InsufficientRewardVault",
      msg: "Insufficient Reward in the vault",
    },
    {
      code: 6012,
      name: "InvalidWithdrawRequest",
      msg: "No NFT in the gamified staking",
    },
    {
      code: 6013,
      name: "ClaimPeriodOver",
      msg: "Claim period is over",
    },
    {
      code: 6014,
      name: "DuringClaimPeriod",
      msg: "Claim period is not over yet",
    },
    {
      code: 6015,
      name: "RaffleNotEnded",
      msg: "Raffle has not ended",
    },
    {
      code: 6016,
      name: "InvalidPrizeIndex",
      msg: "Invalid prize index",
    },
    {
      code: 6017,
      name: "StartTimeError",
      msg: "Invalid new Start time",
    },
    {
      code: 6018,
      name: "NoPrize",
      msg: "No prize",
    },
    {
      code: 6019,
      name: "NotCreator",
      msg: "You are not the Creator",
    },
    {
      code: 6020,
      name: "NotWinner",
      msg: "You are not the Winnner",
    },
    {
      code: 6021,
      name: "OtherEntrants",
      msg: "There are other Entrants",
    },
    {
      code: 6022,
      name: "InvalidCalculation",
      msg: "Invalid calculation",
    },
    {
      code: 6023,
      name: "NotEnoughToken",
      msg: "You don't have enough token",
    },
    {
      code: 6024,
      name: "NotEnoughSOL",
      msg: "You don't have enough SOL",
    },
    {
      code: 6025,
      name: "NotEnoughTicketsLeft",
      msg: "Not enough tickets left",
    },
    {
      code: 6026,
      name: "RaffleStillRunning",
      msg: "Raffle is still running",
    },
    {
      code: 6027,
      name: "WinnersAlreadyClaim",
      msg: "Winner already claimed",
    },
    {
      code: 6028,
      name: "WinnerNotDrawn",
      msg: "Winner not drawn",
    },
    {
      code: 6029,
      name: "InvalidRevealedData",
      msg: "Invalid revealed data",
    },
    {
      code: 6030,
      name: "TokenAccountNotOwnedByWinner",
      msg: "Ticket account not owned by winner",
    },
    {
      code: 6031,
      name: "TicketHasNotWon",
      msg: "Ticket has not won",
    },
    {
      code: 6032,
      name: "UnclaimedPrizes",
      msg: "Unclaimed prizes",
    },
    {
      code: 6033,
      name: "InvalidRecentBlockhashes",
      msg: "Invalid recent blockhashes",
    },
  ],
};
