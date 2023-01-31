import React, { useContext, useEffect } from "react";
import "./App.css";
import LoginPage from "./Component/store/auth";
import Layout from "./Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
// import Indox from "./Component/pages/Indox";
import SentBox from "./Component/pages/sentBox";
import ComposeMail from "./Component/pages/composeMail";
import AuthContext from "./Component/Store2/auth-Context";
import WelcomePage from "./Component/pages/welcome";
import Mailbox from "./Component/mailBox/Mailbox";
import { MailactionMaker } from "./Component/Store2/Mailaction";
import InboxMess from "./Component/pages/InBox";
// import Inbox from "./Component/pages/Indox";
import { useSelector,useDispatch, connect } from "react-redux";
import { SentMailactionMaker2 } from "./Component/Store2/Mailaction";

function App() {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const Email = localStorage.getItem("enteredEmail");
  const Email1 = Email.replace("@", "");
  const Email2 = Email1.replace(".", "");
  dispatch(MailactionMaker(Email2))
  dispatch(SentMailactionMaker2(Email2))
  useEffect(() => {
    // dispatch(MailactionMaker(Email2))
    let id = setInterval(() => {
      console.log('interval started')
      dispatch(MailactionMaker(Email2))
    },2000);
    return(() => clearInterval(id))
    
  },[]);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {/* {authCtx.isLoggedIn && <LoginPage />} */}
          {!authCtx.isLoggedIn && <LoginPage />}
        </Route>
        <Route path={'/welcome'}>
          {authCtx.isLoggedIn && <WelcomePage/>}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/mailbox">
          {authCtx.isLoggedIn && <Mailbox/>}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/receivemessage/:id">
          {authCtx.isLoggedIn && <InboxMess/>}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/compose">
          {authCtx.isLoggedIn && <ComposeMail />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/sentmessage/:id">
          {authCtx.isLoggedIn && <SentBox />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route> 
      </Switch>
    </Layout>
  );
}

export default App;


