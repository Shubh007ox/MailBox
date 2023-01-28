import React from "react";
import { useEffect } from "react";
import useHttp from "../../Hook/usehttp";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleEmailActions } from "../Store2/sentMail-Reducer";
import ComposeMail from "../pages/composeMail";
import WelcomePage from "../pages/welcome";
import Inbox from "../pages/Indox";

const Mailbox = () => {
  const history = useHistory();
  const [error, sendRequest] = useHttp();
  const dispatch = useDispatch();

  const ComposeMailHandler = () => {
    // history.push("./compose");
    const resData = (res) => {
        console.log(res.Data);
        let arr = []
        for (const prop in res.data) {
          arr.push({
            Id: prop,
            message: res.data[prop].message,
            subject: res.data[prop].subject,
          });
        }
        console.log(arr)
        dispatch(handleEmailActions.setReceiveMail(arr));
      };
      console.log("requestsent");
      sendRequest(
        {
          request: "get",
          url: `https://authentication-61603-default-rtdb.firebaseio.com/sent${Email2}.json`,
          header: { "content-type": "application/json" },
        },
        resData
      );
  };
  const Email = localStorage.getItem('enteredEmail');
  const Email1 = Email.replace('@','');
  const Email2 = Email1.replace('.','');
  console.log(Email2);

 
  const receiveMail = useSelector((state) => state.mailManager.receive);
  console.log(receiveMail, "===number");
  useEffect(() => {
    const resData = (res) => {
      console.log(res.Data)
      dispatch(handleEmailActions.setReceiveMail(res.data));
    };
    console.log("requestsent");
    sendRequest(
      {
        request: "get",
        url: `https://authentication-61603-default-rtdb.firebaseio.com/receivedd${Email2}.json`,
        header: { "content-type": "application/json" },
      },
      resData
    );
    // fetch(`https://authentication-61603-default-rtdb.firebaseio.com/receive${Email2}`,{
    //     mode : 'no-cors',
    //     method : "GET",
    //     headers : { "Content-type": "application/json" },
        
    // },
    // resData
    // ).then((res) => {
    //     console.log(res)
    //     console.log('get is doene')
    // })
  }, []);
  return (
    <React.Fragment>
      <main>
      <section>
            {receiveMail.map((mail) => {
              return <Inbox key={mail.id} type={"receive"} mails={mail} />;
            })}
          </section>
        <section>
          <h2>Your Mail BOx</h2>
          <button onClick={ComposeMailHandler}>Compose</button>
          <button>Inbox</button>
          <button>sent</button>
        </section>
        <Route path="/mailbox/inbox">
          <section>
            {receiveMail.map((mail) => {
              return <Inbox key={mail.id} type={"receive"} mails={mail} />;
            })}
          </section>
        </Route>
        <Route path={"./mailbox/compose"}>
          <ComposeMail />
        </Route>
        <Route path={"./mailbox/welcome"}>
          <WelcomePage />
        </Route>
      </main>
    </React.Fragment>
  );
};

export default Mailbox;
// () => {history.push('./mailbox/compose')}
