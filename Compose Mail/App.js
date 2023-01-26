import React, { useContext } from "react";
import "./App.css";
import LoginPage from "./Component/store/auth";
import Layout from "./Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Indox from "./Component/pages/Indox";
import SentBox from "./Component/pages/sentBox";
import ComposeMail from "./Component/pages/composeMail";
import AuthContext from "./Component/Store2/auth-Context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {/* {authCtx.isLoggedIn && <LoginPage />} */}
          {!authCtx.isLoggedIn && <LoginPage />}
        </Route>
        <Route path="/indox">
          {authCtx.isLoggedIn && <Indox />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/sents">
          {authCtx.isLoggedIn && <SentBox />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/compose">
          {authCtx.isLoggedIn && <ComposeMail />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
