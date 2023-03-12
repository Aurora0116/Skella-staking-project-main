import { useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Stacke from "../Views/Stacke";
import Unstake from "../Views/Unstake";
import { useMediaQuery } from "react-responsive";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Navigate } from "react-router-dom";
import {
  claimRaffleReward,
  claimReward,
  gameNftStaking,
  getGlobalAutority,
  getGlobalState,
  getMyNft,
  getNftMetaData,
  getRafflePoolState,
  getRewardData,
  getUserPoolState,
  revealWinner,
  stakeNft,
  withdrawGameNft,
  withdrawNft,
} from "../contexts/script";
import { COLLECTION, raffleSeed } from "../../config";

import { GridLoader } from "react-spinners";
import Countdown from "react-countdown";
// import { getParsedAccountByMint } from "@nfteyez/sol-rayz";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  // const [userPool, setUserPool] = useState();
  const [fog, setFog] = useState(true);
  const [raffleAdminList, setRaffleAdminList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [raffleAddress, setRaffleAddress] = useState();
  const [stakeState, setStakeState] = useState("");
  const [raffleReadyText, setRaffleReadyText] = useState(0);
  const [walletNfts, setWalletNfts] = useState([]);
  const [stakedNFTs, setStakedNFTs] = useState([]);
  const [rewardText, setRewardText] = useState();
  const [stakedCount, setStakedCount] = useState();
  const [loading, setLoading] = useState(false);
  const [countStart, setCountstart] = useState(false);

  // const [selected, setSelected] = useState([]);
  const [selectBtn, setSelectBtn] = useState(0);
  const btnData = [
    {
      val: 1,
    },
    {
      val: 5,
    },
    {
      val: 13,
    },
  ];

  const wallet = useWallet();

  // const addAdmin = async () => {
  //   await addToWhitelist(
  //     wallet,
  //     new PublicKey("8uXPEnj14kYwG4G6fAUCTyTdVQ2BXAo4i63e1QdJi5LY")
  //   );
  // };

  // const removeAdmin = async () => {
  //   await removeFromWhitelist(
  //     wallet,
  //     new PublicKey("G7JAZkRvjrq5amBigGutL1UjdLCTW29G3PktCghE7kz2")
  //   );
  // };

  const getAdmin = async () => {
    if (wallet.publicKey === null || fog === false) {
      setFog(true);
      return;
    }
    setFog(false);
    const global = await getGlobalState();
    if (global) {
      let raffleaddresstemp = [];
      const globalAuthority = await getGlobalAutority();
      raffleaddresstemp.push(globalAuthority.toBase58());
      for (let i = 0; i < global.whitelistedCount.toNumber(); i++) {
        console.log("count", global.whitelistedCount.toNumber());
        console.log("global", global.whitelist[i].toBase58());
        console.log("user", wallet.publicKey.toBase58());
        if (wallet.publicKey.toBase58() === global.whitelist[i].toBase58()) {
          setIsAdmin(true);
          return;
        }
      }
      let adminTemp = [];
      // let stateTemp = [];
      for (let i = 0; i < global.whitelistedCount.toNumber(); i++) {
        for (let j = 0; j < 3; j++) {
          const state = await getRafflePoolState(
            raffleSeed[j],
            global.whitelist[i]
          );
          if (!state) continue;
          if (
            new Date(state.pool.endTimestamp.toNumber() * 1000 + 1200000) >
            new Date()
          ) {
            raffleaddresstemp.push(state.id.toBase58());
            adminTemp.push(global.whitelist[i]);
            setStakeState("rewardtime");
            // stateTemp.push(state);
          }
        }
      }
      setRaffleAddress(raffleaddresstemp);
      setRaffleAdminList(adminTemp);
    }
  };

  // const getTimeText = (remain) => {
  //   let time = "";
  //   if (remain > 86400000) {
  //     time +=
  //       parseInt(remain / 86400000) +
  //       " Days  " +
  //       parseInt((remain % 86400000) / 3600000) +
  //       " Hours  " +
  //       parseInt((remain % 3600000) / 60000) +
  //       " Mins";
  //   } else if (remain > 3600000) {
  //     time +=
  //       parseInt((remain % 86400000) / 3600000) +
  //       " Hours  " +
  //       parseInt((remain % 3600000) / 60000) +
  //       " Mins";
  //   } else {
  //     time += parseInt((remain % 3600000) / 60000) + " Mins";
  //   }
  //   return time;
  // };

  const getRaffleState = async () => {
    const raffle = await getEachRaffleState();
    if (!raffle || raffle.length === 0) return;
    // for (let i = 0; i < raffleAdminList.length; i++) {
    if (
      raffle[0].pool.startTimestamp.toNumber() * 1000 - new Date().getTime() >
      // 86400000
      1200000
    ) {
      const remain =
        raffle[0].pool.startTimestamp.toNumber() * 1000 -
        new Date().getTime() -
        // 86400000;
        1200000;
        
      // console.log(remain);
      setRaffleReadyText(remain);
      setStakeState("normal");
    } else if (
      raffle[0].pool.startTimestamp.toNumber() * 1000 - new Date().getTime() <
        // 86400000
        1200000 &&
      raffle[0].pool.startTimestamp.toNumber() * 1000 > new Date().getTime()
    ) {
      const remain =
        raffle[0].pool.startTimestamp.toNumber() * 1000 - new Date().getTime();
      // console.log(remain);
      setRaffleReadyText(remain);
      setStakeState("ready");
    } else if (
      raffle[0].pool.startTimestamp.toNumber() * 1000 < new Date().getTime() &&
      raffle[0].pool.endTimestamp.toNumber() * 1000 > new Date().getTime()
    ) {
      const remain =
        raffle[0].pool.endTimestamp.toNumber() * 1000 - new Date().getTime();
      // console.log(remain);
      setRaffleReadyText(remain);
      setStakeState("raffle");
    } else if (
      raffle[0].pool.endTimestamp.toNumber() * 1000 + 1200000 >
      new Date().getTime()
    ) {
      // let time = "Raffle Over";
      // setRaffleReadyText(time);
      // return;
    }
    setCountstart(true);
    // }
  };

  const getUserPool = async () => {
    const list = await getUserPoolState(wallet);
    return list;
  };

  const getEachRaffleState = async () => {
    if (raffleAdminList[0]) {
      let stateTemp = [];
      const state = await getRafflePoolState(
        raffleSeed[selectBtn],
        raffleAdminList[0]
      );
      if (
        new Date(state.pool.endTimestamp.toNumber() * 1000 + 1200000) >
        new Date()
      ) {
        stateTemp.push(state);
      }
      return stateTemp;
    }
  };

  const getRaffleStakeNFTs = async () => {
    const raffle = await getEachRaffleState();
    const userPool = await getUserPool();
    if (raffle && userPool && raffle.length !== 0) {
      let stakedNFTstemp = [];
      for (let i = 0; i < userPool.stakedCount.toNumber(); i++) {
        const nft = await getNftMetaData(userPool.stakedNfts[i].mint);
        if (nft.data.data.creators[0].address === COLLECTION) {
          if (
            userPool.stakedNfts[i].raffleAddress.toBase58() ===
            raffle[0].id.toBase58()
          ) {
            await fetch(nft.data.data.uri)
              .then((resp) => resp.json())
              .then((json) => {
                stakedNFTstemp.push({
                  address: nft.data.mint,
                  name: json.name,
                  image: json.image,
                  selected: false,
                  staked: true,
                });
              });
          }
        }
      }
      setStakedNFTs(stakedNFTstemp);
    }
  };

  const getWalletNFTs = async () => {
    const walletNft = await getMyNft(wallet);
    let nftDump = [];
    if (walletNft) {
      for (let item of walletNft) {
        if (item.data.creators[0].address === COLLECTION) {
          await fetch(item.data.uri)
            .then((resp) => resp.json())
            .then((json) => {
              nftDump.push({
                address: item.mint,
                name: item.data.name,
                image: json.image,
                selected: false,
                staked: false,
              });
            });
        }
      }
    }
    setWalletNfts(nftDump);
  };

  const getStakedNFTs = async () => {
    const list = await getUserPool();
    // const list = await getUserPoolState(wallet);
    if (list) {
      console.log(list.stakedCount.toNumber());
      let stakedNFTstemp = [];
      if (stakeState === "normal") {
        for (let i = 0; i < list.stakedCount.toNumber(); i++) {
          const nft = await getNftMetaData(list.stakedNfts[i].mint);
          if (nft.data.data.creators[0].address === COLLECTION) {
            // if (
            //   list.stakedNfts[i].raffleAddress.toBase58() === globalAuthority
            // ) {
            await fetch(nft.data.data.uri)
              .then((resp) => resp.json())
              .then((json) => {
                stakedNFTstemp.push({
                  address: nft.data.mint,
                  name: json.name,
                  image: json.image,
                  selected: false,
                  staked: true,
                });
              });
            // }
          }
        }
      }
      setStakedNFTs(stakedNFTstemp);
    }
  };

  const getPoolRewardData = async () => {
    const raffle = await getEachRaffleState();
    if (raffle) {
      const state = await getRewardData(new PublicKey(raffle[0].id));
      let text = [];
      for (let i = 0; i < state.amounts.length; i++) {
        let temp = "";
        temp += state.amounts[i];
        if (
          state.tokens[i] === "FpDMF9oyH95csNptj4JQDAC6kwcp3shquY8q5ZirsxTk"
        ) {
          temp += " $BONES  ";
        } else {
          temp += " NFT";
        }
        text.push(temp);
      }
      console.log("drawText");
      setRewardText(text);
    }
  };

  const calcuStakeCount = async () => {
    const userPool = await getUserPool();
    if (userPool) {
      let total = walletNfts.length;
      let staked = 0;
      for (let i = 0; i < userPool.stakedCount.toNumber(); i++) {
        const nft = await getNftMetaData(userPool.stakedNfts[i].mint);
        if (nft.data.data.creators[0].address === COLLECTION) {
          staked++;
        }
      }
      total += staked;
      const text = "Skella staked : " + staked + "/" + total;
      setStakedCount(text);
    }
  };

  const calcuClaimReward = async () => {
    const userPool = await getUserPool();
    if (userPool) {
      let total = 0;
      for (let i = 0; i < userPool.stakedCount.toNumber(); i++) {
        const nft = await getNftMetaData(userPool.stakedNfts[i].mint);
        if (nft.data.data.creators[0].address === COLLECTION) {
          if (
            parseInt(
              (new Date().getTime() -
                userPool.stakedNfts[i].stakedTime.toNumber() * 1000) /
                86400
            ) > 0
          ) {
            total +=
              parseInt(
                (new Date().getTime() -
                  userPool.stakedNfts[i].stakedTime.toNumber() * 1000) /
                  86400000
              ) * 4;
          }
        }
      }
      const text = total + " $BONES";
      setRewardText(text);
    } else {
      setRewardText("0 $BONES");
    }
  };

  useEffect(() => {
    calcuStakeCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletNfts]);

  useEffect(() => {
    getStakedNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeState]);

  useEffect(() => {
    getRaffleStakeNFTs();
    getPoolRewardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectBtn, raffleAdminList]);

  useEffect(() => {
    if (
      !raffleAdminList ||
      (raffleAdminList.length === 0 && stakeState !== "rewardtime")
    ) {
      setStakeState("normal");
    } else {
      getRaffleState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raffleAdminList, selectBtn]);

  useEffect(() => {
    // addAdmin();
    getAdmin();
    getWalletNFTs();
    getStakedNFTs();
    calcuClaimReward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);

  const changeHandle = (address, selected, staked) => {
    if (staked) {
      for (let item of stakedNFTs) {
        if (item.address === address) {
          item.selected = selected;
        }
      }
    } else {
      for (let item of walletNfts) {
        if (item.address === address) {
          item.selected = selected;
        }
      }
    }
  };

  const updatePageStates = () => {
    getWalletNFTs();
    if (stakeState === "normal" || stakeState === "rewardtime") {
      getStakedNFTs();
    } else {
      getRaffleStakeNFTs();
    }
  };

  const stakeNFTs = async () => {
    if (walletNfts.length !== 0) {
      const raffle = await getEachRaffleState();
      if (stakeState === "ready" && raffle) {
        let nfts = [];
        for (let item of walletNfts) {
          if (item.selected) {
            nfts.push({ mint: new PublicKey(item.address) });
          }
        }
        await gameNftStaking(
          wallet,
          nfts,
          raffle[0].id,
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      } else if (stakeState === "normal") {
        let nfts = [];
        for (let item of walletNfts) {
          if (item.selected) {
            nfts.push({ mint: new PublicKey(item.address) });
          }
        }
        await stakeNft(
          wallet,
          nfts,
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      }
    }
  };

  const stakeAllNFTs = async () => {
    if (walletNfts.length !== 0) {
      const raffle = await getEachRaffleState();
      if (stakeState === "ready" && raffle) {
        let nfts = [];
        for (let item of walletNfts) {
          nfts.push({ mint: new PublicKey(item.address) });
        }
        await gameNftStaking(
          wallet,
          nfts,
          raffle[0].id,
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      } else if (stakeState === "normal") {
        let nfts = [];
        for (let item of walletNfts) {
          nfts.push({ mint: new PublicKey(item.address) });
        }
        await stakeNft(
          wallet,
          nfts,
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      }
    }
  };

  const unstakeNFTs = async () => {
    if (stakedNFTs.length !== 0) {
      if (stakeState === "ready") {
        let nfts = [];
        for (let item of stakedNFTs) {
          if (item.selected) {
            nfts.push({ mint: new PublicKey(item.address) });
          }
        }
        await withdrawGameNft(
          wallet,
          nfts,
          raffleSeed[selectBtn],
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      } else {
        let nfts = [];
        for (let item of stakedNFTs) {
          if (item.selected) {
            nfts.push({ mint: new PublicKey(item.address) });
          }
        }
        await withdrawNft(
          wallet,
          nfts,
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      }
    }
  };

  const unStakeAllNFTs = async () => {
    if (stakedNFTs.length !== 0) {
      if (stakeState === "ready") {
        let nfts = [];
        for (let item of stakedNFTs) {
          nfts.push({ mint: new PublicKey(item.address) });
        }
        await withdrawGameNft(
          wallet,
          nfts,
          raffleSeed[selectBtn],
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      } else {
        let nfts = [];
        for (let item of stakedNFTs) {
          nfts.push({ mint: new PublicKey(item.address) });
        }
        await withdrawNft(
          wallet,
          nfts,
          () => setLoading(true),
          () => setLoading(false),
          () => updatePageStates()
        );
      }
    }
  };

  const withdrawReward = async () => {
    if (stakeState === "normal" || stakeState === "rewardtime") {
      await claimReward(wallet);
    } else {
      const raffle = await getEachRaffleState();
      if (
        raffle[0].pool.winners[0].toBase58() ===
        "11111111111111111111111111111111"
      ) {
        await revealWinner(raffle[0].id, wallet);
      }
      await claimRaffleReward(raffle[0].id, wallet);
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
    } else {
      // Render a countdown
      if (hours) {
        return (
          <>
            <span>
              {hours} Hour : {minutes} Min : {seconds} Sec
            </span>
          </>
        );
      } else if (minutes) {
        return (
          <>
            <span>
              {minutes} Min : {seconds} Sec
            </span>
          </>
        );
      }
    }
  };

  //Media Quearry
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 950px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div>
      {isAdmin && <Navigate to="/connect" replace />}
      <div style={{ margin: "30px auto" }}>
        <Paper
          style={{
            width: "79%",
            display: "flex",
            margin: "0px auto",
            borderRadius: "30px",
            height: "120px",
            padding: "0px 30px",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Grid container display={"flex"} alignItems={"center"}>
            <Grid item xs={12} md={6}>
              {stakedCount && (
                <Typography color={"#fff"}>{stakedCount}</Typography>
              )}
              {/* <Typography color={"#fff"}>Skella staked : 5/10</Typography> */}
              {/* <Typography color={"#fff"}></Typography> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Typography color={"#fff"}>{rewardText}</Typography>

                <Button
                  style={{
                    borderRadius: "53px",
                    background:
                      "linear-gradient(89.72deg, #F1E71A 0.22%, #D515FE 99.75%)",
                    color: "#fff",
                    marginLeft: "20px",
                    padding: "15px 30px",
                  }}
                  onClick={withdrawReward}
                >
                  <Typography color={"#fff"} style={{ fontSize: "12px" }}>
                    Claim Now
                  </Typography>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid
          item
          style={{
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.2)",
            width: "50%",
            margin: "0px auto",
            padding: "10px 0px",
            borderBottomLeftRadius: "30px",
            borderBottomRightRadius: "30px",
            borderTopLeftRadius: "0px",
          }}
        >
          {stakeState !== "normal" &&
            btnData.map((val, ind) => {
              return (
                <Button
                  style={{
                    marginLeft: `${isMobile ? "0px" : "5px"}`,
                    background: `${
                      ind === selectBtn
                        ? "linear-gradient(90deg, #46A5FF 0%, rgba(74, 176, 255, 0.76) 0%, rgba(198, 40, 247, 0.82) 104.87%)"
                        : "rgba(255, 255, 255, 0.2)"
                    }`,
                    borderRadius: "53px",
                    border: "0px solid red",
                    height: "15px",
                    padding: "15px 25px",
                    color: "#fff",
                    marginTop: `${isMobile ? "20px" : "0px"}`,
                  }}
                  onClick={() => {
                    setSelectBtn(ind);
                  }}
                  key={ind}
                >
                  {val.val} Day
                </Button>
              );
            })}

          {stakeState === "raffle" && (
            <Typography style={{ color: "#fff" }}>
              The winner is being decided.
            </Typography>
          )}
          <Typography style={{ color: "#fff" }}>
            {countStart && raffleReadyText && (
              <Countdown
                date={Date.now() + raffleReadyText}
                renderer={renderer}
              />
            )}

            {/* Gamify you skellas in {raffleReadyText} */}
          </Typography>
        </Grid>
      </div>
      <Grid
        container
        style={{
          width: "85%",
          margin: "0px auto",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {loading ? (
          <div className="loader-container">
            <GridLoader size={30} color="#ad18b4" />
          </div>
        ) : (
          <></>
        )}
        {/* Staked Container */}
        <Grid item md={6}>
          <Grid
            container
            style={{
              width: "97%",
              margin: "0px auto",
              background:
                "linear-gradient(90deg, rgba(70, 165, 255, 0.1) 0%, rgba(74, 176, 255, 0.076) 0%, rgba(198, 40, 247, 0.082) 104.87%)",
              padding: "20px 0px",
              borderRadius: "20px",
            }}
          >
            <Grid
              item
              md={12}
              display={"flex"}
              justifyContent={"flex-end"}
              style={{ margin: "15px 0px", padding: "0px 30px" }}
            >
              {stakeState !== "raffle" && (
                <>
                  <Button
                    color="primary"
                    style={{
                      background: "rgba(255, 255, 255, 0.21",
                      color: "#fff",
                      borderRadius: "30px",
                      padding: "5px 15px",
                    }}
                    onClick={() => stakeNFTs()}
                  >
                    Stake
                  </Button>
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, #46A5FF 0%, rgba(74, 176, 255, 0.76) 0%, rgba(198, 40, 247, 0.82) 104.87%)",
                      color: "#fff",
                      borderRadius: "30px",
                      padding: "5px 15px",
                      marginLeft: "10px",
                    }}
                    onClick={() => stakeAllNFTs()}
                  >
                    Stake All
                  </Button>
                </>
              )}
            </Grid>
            {walletNfts.length !== 0 &&
              walletNfts.map((val, ind) => {
                return <Stacke item={val} key={ind} onChange={changeHandle} />;
              })}
          </Grid>
        </Grid>
        {/* Untaked Container */}

        <Grid item md={6} style={{ marginTop: `${isMobile ? "15px" : "0px"}` }}>
          <Grid
            container
            style={{
              width: "97%",
              margin: "0px auto",
              background:
                "linear-gradient(90deg, rgba(70, 165, 255, 0.1) 0%, rgba(74, 176, 255, 0.076) 0%, rgba(198, 40, 247, 0.082) 104.87%)",
              padding: "20px 0px",
              borderRadius: "20px",
              // marginTop: "20px",
              // display: "block",
            }}
          >
            <Grid
              item
              md={12}
              display={"flex"}
              justifyContent={"flex-end"}
              style={{ margin: "15px 0px", padding: "0px 30px" }}
            >
              {stakeState !== "raffle" && (
                <>
                  <Button
                    style={{
                      background: "rgba(255, 255, 255, 0.21)",
                      color: "#fff",
                      borderRadius: "30px",
                      padding: "5px 15px",
                    }}
                    onClick={() => unstakeNFTs()}
                  >
                    unStake
                  </Button>
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, #46A5FF 0%, rgba(74, 176, 255, 0.76) 0%, rgba(198, 40, 247, 0.82) 104.87%)",
                      color: "#fff",
                      borderRadius: "30px",
                      padding: "5px 15px",
                      marginLeft: "10px",
                    }}
                    onClick={() => unStakeAllNFTs()}
                  >
                    Unstake All
                  </Button>
                </>
              )}
            </Grid>

            {stakedNFTs.map((val, ind) => {
              return <Unstake item={val} key={ind} onChange={changeHandle} />;
            })}
          </Grid>
        </Grid>
      </Grid>
      {fog && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            width: "100vw",
            height: "100vh",
            zIndex: "3",
            position: "fixed",
            top: "0",
          }}
        >
          <h1
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            Connect Wallet
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
