/* eslint-disable jsx-a11y/alt-text */
import { Grid, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { useMediaQuery } from "react-responsive";
import Cross from "../assets/Cross.png";
import Sign from "../assets/Sign.png";

const HelperDropdown = ({ removeTodo, setData, data }) => {
  //Dropdown Option
  const [dropdown, setDropdown] = useState(data.amount);
  const [address, setAddress] = useState(data.address);

  //Media Quearry
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 950px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 400px)" });

  useEffect(() => {
    data.amount = dropdown;
    data.address = address;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdown, address]);

  return (
    <Grid
      container
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Grid
        item
        alignItems={isSmall ? "flex-start" : "center"}
        style={{
          display: "flex",
          padding: "15px 0px",
          // borderBottom: "1px solid #fff",
          flexDirection: `${isMobile ? "column" : "row"}`,
        }}
      >
        <Select
          // id="demo-simple-select"
          value={dropdown}
          label="none"
          onChange={(e) => setDropdown(e.target.value)}
          // defaultChecked={"Dropdown"}
          style={{
            color: "#fff",
            borderRadius: "53px",
            padding: `${isSmall ? "0px 0px" : "0px 0px"}`,
            background: "#52514f",
            width: "230px",
            textAlign: "center",
          }}
        >
          <MenuItem value={0}>Dropdown</MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <input
          placeholder="Address"
          style={{
            padding: `${isSmall ? "18px 0px" : "18px 0px"}`,
            borderRadius: "53px",
            marginLeft: `${isMobile ? "0px" : "15px"}`,
            border: "none",
            background: "#52514f",
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "Center",
            color: "fff",
            marginTop: `${isMobile ? "10px" : "0px"}`,
            width: "230px",
          }}
          value={address}
          onInput={(e) => setAddress(e.target.value)}
          className="input"
        />
      </Grid>
      <Grid item style={{ marginTop: `${isMobile ? "15px" : "0px"}` }}>
        <img
          src={Sign}
          style={{ height: "40px", marginRight: "10px", cursor: "pointer" }}
          onClick={() => setData(data.id, dropdown, address)}
        />
        <img
          src={Cross}
          style={{ height: "40px", cursor: "pointer" }}
          onClick={() => removeTodo(data.id)}
        />
      </Grid>
    </Grid>
  );
};

export default HelperDropdown;
