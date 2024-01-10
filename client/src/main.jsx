import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ToastContainer />
    <Navbar />
    <App />
  </ChakraProvider>
);
