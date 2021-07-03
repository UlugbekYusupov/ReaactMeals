import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import CardProvider from "./store/CardProvider";

const root = document.getElementById("root");

ReactDOM.render(
  <AuthContextProvider>
    <CardProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CardProvider>
  </AuthContextProvider>,
  root
);
