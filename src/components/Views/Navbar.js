/* eslint-disable jsx-a11y/alt-text */
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import skella from "../assets/skella.svg";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <div>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        style={{
          padding: "0px 40px",
          background: "rgba(255, 255, 255, 0.05)",
          height: "80px",
          boxShadow: "0px 2px 4px rgba(0, 150, 255, 0.2)",
        }}
      >
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <img src={skella} height={"50px"} />
        </Link>

        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>

        {/* <Link to="/connect" style={{ color: "#fff", textDecoration: "none" }}>
          <Button
            style={{
              borderRadius: "53px",
              background:
                "linear-gradient(90deg, #46A5FF 0%, rgba(74, 176, 255, 0.76) 0%, rgba(198, 40, 247, 0.82) 104.87%)",
              color: "#fff",
            }}
          >
            Connect Wallet
          </Button>
        </Link> */}
      </Grid>
    </div>
  );
};

export default Navbar;
