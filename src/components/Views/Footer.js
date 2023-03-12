/* eslint-disable jsx-a11y/alt-text */
import { Grid, Typography, Paper } from "@mui/material";

import telegram from "../assets/social/telegram.png";
import twiter from "../assets/social/twiter.png";
import instagram from "../assets/social/Instagram.png";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        // marginTop: "auto",
        // position: "absolute",
        // bottom: "0px",
        // top: "95vh",
        // width: "100%",
        justifyContent: "center",
      }}
    >
      <Paper
        style={{
          width: "80%",
          borderLeft: " none !important",
          borderRight: "none",
          border: "1px solid white",

          //   padding: "20px 25px",
          margin: "20px 0px",
          background: "none",
        }}
      >
        <Grid container justifyContent={"space-around"} alignItems={"center"}>
          <Grid item md={4} style={{ padding: "10px 20px" }}>
            <Typography
              color={"#fff"}
              style={{ fontSize: "12px", textAlign: "center" }}
            >
              The Good Skella Team 💀
            </Typography>
          </Grid>
          <Grid item md={4} style={{ padding: "10px 20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderLeft: "1px solid #fff",
                  borderRight: "1px solid #fff",
                  padding: "0px 10px",
                }}
              >
                <img src={telegram} style={{ height: "30px" }} />
              </div>
              <div
                style={{
                  borderRight: "1px solid #fff",
                  padding: "0px 10px",
                }}
              >
                <img src={twiter} style={{ height: "30px" }} />
              </div>
              <div
                style={{
                  borderRight: "1px solid #fff",
                  padding: "0px 10px",
                }}
              >
                <img src={instagram} style={{ height: "30px" }} />
              </div>
            </div>
          </Grid>
          <Grid item md={4} style={{ padding: "10px 20px" }}>
            <Typography
              style={{ fontSize: "12px", textAlign: "center" }}
              color={"#fff"}
            >
              PRIVACY POLICE | TERM & CONDITION
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Footer;
