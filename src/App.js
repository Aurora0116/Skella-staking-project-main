import "./App.css";
import Navbar from "./components/Views/Navbar";
import Footer from "./components/Views/Footer";

import { Wallets } from "./components/wallet";
import Router from "./routes";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Wallets>
      <Navbar />
      <Router />
      <Footer />
    </Wallets>
  );
}
