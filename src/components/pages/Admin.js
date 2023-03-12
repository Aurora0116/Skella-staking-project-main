/* eslint-disable array-callback-return */
import { Button, Grid, Slider, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { createContext, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate } from "react-router-dom";
import { DAY, raffleSeed } from "../../config";
import {
  addReward,
  createRaffle,
  getGlobalState,
  getRafflePoolState,
  removeReward,
  stopRaffle,
  updateRafflePeriod,
} from "../contexts/script";
import RewardStaking from "../Views/RewardStaking";

export const UserContext = createContext();

const Admin = () => {
  const [stake, setStake] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [totalNFTticket, setTotalNFTticket] = useState(1000);
  const [isAdmin, setIsAdmin] = useState(true);
  const [duringTime, setDuringTime] = useState(50);
  const [stateRaffle, setStateRaffle] = useState();
  const [rewardData, setRewardData] = useState([]);
  const [id, setId] = useState(0);
  const [flag, setFlag] = useState(true);
  const [loading, setLoading] = useState(false);

  const wallet = useWallet();

  useEffect(() => {
    if (stateRaffle) console.log(stateRaffle.pool.startTimestamp.words[1]);
  }, [stateRaffle]);

  const saveRewardData = async () => {
    let data = [];
    for (let item of rewardData) {
      console.log(item.address);
      data.push({
        raffleSeed: raffleSeed[item.type],
        tokenMint: new PublicKey(item.address),
        tokenAmount: item.amount,
      });
    }
    if (flag) {
      await addReward(data, wallet);
      setFlag(false);
    } else {
      await removeReward(data, wallet);
    }
  };

  const getAdmin = useCallback(async () => {
    if (wallet.publicKey === null) {
      setIsAdmin(false);
      return;
    }
  }, [wallet.publicKey]);

  useEffect(() => {
    getAdmin();
  }, [getAdmin, wallet.connected]);

  //Media Quearry
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 950px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

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

  const startRaffle = async () => {
    if (!stateRaffle) {
      let data = [];
      for (let i = 0; i < 3; i++) {
        data.push({ period: DAY[i], raffleSeed: raffleSeed[i] });
      }
      await createRaffle(
        Number(new Date().getTime() + (2 + parseInt(duringTime)) * 600000),
        data,
        200,
        wallet
      );
    } else if (stateRaffle.pool.startTimestamp.words[1] === 67108863) {
      console.log("%$%^$%^");
      let data = [];
      for (let i = 0; i < 3; i++) {
        data.push({ period: DAY[i] / 300, raffleSeed: raffleSeed[i] });
      }
      await updateRafflePeriod(
        data,
        Number(new Date().getTime() + parseInt(duringTime) * 600000),
        wallet
      );
    } else {
      alert("Do not create Raffle. Raffle began started.");
    }
  };
  //   const startRaffle = async () => {
  //     if (!stateRaffle) {
  //       for (let i = 0; i < 3; i++) {
  //         await createRaffle(
  //           Number(new Date().getTime() + (24 + parseInt(duringTime)) * 3600000),
  //           DAY[i],
  //           raffleSeed[i],
  //           100,
  //           wallet
  //         );
  //       }
  //     } else {
  //       alert("Do not create Raffle. Raffle began started.");
  //     }
  //   };
  //{amount: 20, address: 'dfsgdg', type: 0, id: 0}
  const raffleState = async () => {
    let id = 0;
    let rewarddata = [];
    for (let i = 0; i < 3; i++) {
      const state = await getRafflePoolState(raffleSeed[i], wallet.publicKey);
      if (state) {
        for (let j = 0; j < state.pool.winnerCount.toNumber(); j++) {
          rewarddata.push({
            amount: state.pool.rewardTokenAddress[j].amount.toNumber(),
            address: state.pool.rewardTokenAddress[j].tokenAddress.toBase58(),
            type: i,
            id: id,
          });
          id++;
        }
      }
      setRewardData(rewarddata);
      setStateRaffle(state);
      setId(id);
      // setTotalNFTticket(state.maxEntrants.toNumber());
    }
    setLoading(true);
  };

  const stop = async () => {
    let data = [];
    for (let i = 0; i < 3; i++) {
      data.push({ raffleSeed: raffleSeed[i] });
    }
    await stopRaffle(wallet, data);
  };

  const getAllStakedNfts = async () => {
    const state = await getGlobalState();
    setStake(state.totalStakedCount.toNumber());
    console.log(state.totalStakedCount.toNumber());
  };

  // useEffect(() => console.log(rewardData), [rewardData]);

  useEffect(() => {
    raffleState();
    getAllStakedNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected]);

  return (
    <div>
      {!isAdmin && <Navigate to="/" replace />}
      {loading && (
        <>
          <Grid
            item
            style={{ width: "80%", display: "block", margin: "20px auto" }}
          >
            <Typography color={"#fff"}>
              Cureently Staked: {stake}/{totalNFTticket}
            </Typography>
            <Slider
              aria-label="default"
              min={0}
              max={totalNFTticket}
              value={stake}
              style={{ height: "10px", color: "blue" }}
              // onChange={(e, val) => setStake(val)}
            />
          </Grid>
          <Grid
            item
            style={{
              width: "80%",
              display: "block",
              margin: "20px auto",
              background:
                "linear-gradient(90deg, rgba(70, 165, 255, 0.26) 0%, rgba(74, 176, 255, 0.1976) 0%, rgba(198, 40, 247, 0.2132) 104.87%)",
              borderRadius: "15px",
              padding: "10px 20px",
            }}
          >
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px 20px",
                alignItems: "center",
                borderBottom: ".5px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Grid item md={5} xs={12}>
                <Typography variant="h6" color={"#fff"}>
                  Next Gamified Staking In
                </Typography>
              </Grid>
              <Grid
                item
                md={7}
                xs={12}
                style={{
                  display: `${isMobile ? "block" : "flex"}`,
                  alignItems: "center",
                  justifyContent: `${
                    isTabletOrMobile ? "flex-start" : "flex-end"
                  }`,
                  marginTop: `${isTabletOrMobile ? "15px" : "0px"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{
                      marginRight: "10px",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "53px",
                      border: "0px solid red",
                      height: "30px",
                      padding: "0px 0px",
                      color: "#fff",
                      fontSize: "16px",
                      textIndent: "15px",
                    }}
                    className="hours_input"
                    placeholder="50"
                    onInput={(e) => setDuringTime(e.target.value)}
                    value={duringTime}
                  />
                  <Typography color={"#fff"}> Hours</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: `${isMobile ? "15px" : "0px"}`,
                  }}
                >
                  <Button
                    style={{
                      marginLeft: `${isMobile ? "0px" : "10px"}`,
                      background: "#0096FF",
                      borderRadius: "53px",
                      border: "0px solid red",
                      height: "30px",
                      padding: "0px 30px",
                      color: "#fff",
                    }}
                    onClick={() => startRaffle()}
                  >
                    Start
                  </Button>
                  <Button
                    style={{
                      marginLeft: "10px",
                      background: "#48C379",
                      borderRadius: "53px",
                      border: "0px solid red",
                      height: "30px",
                      padding: "0px 30px",
                      color: "#fff",
                    }}
                    onClick={() => stop()}
                  >
                    Stop
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px 20px",
                alignItems: "center",
                // borderRadius: "10px",
              }}
            >
              <Grid item md={5} xs={12}>
                <Typography variant="h6" color={"#fff"}>
                  Rewards for staking:
                </Typography>
              </Grid>
              <Grid
                item
                md={7}
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: `${isMobile ? "column" : "row"}`,
                  // alignItems: "center",
                  justifyContent: `${
                    isTabletOrMobile ? "flex-start" : "flex-end"
                  }`,
                  marginTop: `${isTabletOrMobile ? "20px" : "0px"}`,
                }}
              >
                {btnData.map((val, ind) => {
                  return (
                    <Button
                      style={{
                        marginLeft: `${isMobile ? "0px" : "10px"}`,
                        background: `${
                          ind === selectBtn
                            ? "linear-gradient(90deg, #46A5FF 0%, rgba(74, 176, 255, 0.76) 0%, rgba(198, 40, 247, 0.82) 104.87%)"
                            : "rgba(255, 255, 255, 0.2)"
                        }`,
                        borderRadius: "53px",
                        border: "0px solid red",
                        height: "30px",
                        padding: "30px 60px",
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
              </Grid>
            </Grid>
          </Grid>
          <RewardStaking
            // key={ind}
            setData={rewardData}
            value={selectBtn}
            setFunction={setRewardData}
            saveData={saveRewardData}
            id={id}
            setId={setId}
          />
        </>
      )}
    </div>
  );
};

export default Admin;
