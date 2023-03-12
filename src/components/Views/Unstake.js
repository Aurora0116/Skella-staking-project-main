/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import Ring from "../assets/Ring.png";
import SelectedRing from "../assets/SelectedRing.png";

const Unstacke = ({ item, onChange, value }) => {
  const [select, setSelect] = useState(false);
  // console.log("Unstake  >>", item);

  useEffect(() => {
    onChange(item.address, select, item.staked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);
  return (
    <Grid
      item
      lg={4}
      md={6}
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
        cursor: "pointer",
      }}
      onClick={() => setSelect(!select)}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(70, 165, 255, 0.25) 0%, rgba(74, 176, 255, 0.19) 0%, rgba(198, 40, 247, 0.205) 104.87%)",
          borderRadius: "10px",
          position: "relative",
          // paddingRight: "10px",
          width: "150px",
          height: "165px",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={!select ? Ring : SelectedRing}
            height={"20px"}
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              right: "30px",
              top: "-20px",
              zIndex: "2",
            }}
          />
          <img
            src={item.image}
            height={"160px"}
            style={{
              position: "absolute",
              top: "-20px",
              width: "140px",
            }}
          />
        </div>
        <Typography
          style={{
            color: "#fff",
            marginLeft: "10px",
            position: "absolute",
            bottom: "0",
          }}
        >
          {item.name}
        </Typography>
      </div>
    </Grid>
  );
};

export default Unstacke;
