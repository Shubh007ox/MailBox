import React from "react";
import classes from "./Inbox.module.css";
import useHttp from "../../Hook/usehttp";
import { useDispatch } from "react-redux";
import { handleEmailActions } from "../Store2/sentMail-Reducer";
import { NavLink } from "react-router-dom";

const Inbox = (props) => {
  const [error, sendRequest] = useHttp();
  const dispatch = useDispatch();
  console.log("inside Inbox");
  const Email = localStorage.getItem("enteredEmail");
  const Email1 = Email.replace("@", "");
  const Email2 = Email1.replace(".", "");
  const removeTickHandler = () => {
    const ObjectData = {
      seen: true,
    };
    const responseHandler = (res) => {
      if(props.type === "receive"){
        dispatch(handleEmailActions.seenMessage(props.mails.id))
      }else{
        dispatch(handleEmailActions.seenSentMessageHand(props.mails.id))
      }
      console.log(res);
    };
    sendRequest(
      {
        request: "patch",
        url: `https://authentication-61603-default-rtdb.firebaseio.com/${props.type}${Email2}/${props.mails.id}.json`,
        data: ObjectData,
        header : {'Content-type' : 'application/json'}
      },
      responseHandler
    );
  };

  return (
    <React.Fragment>
      <h3>{error}</h3>
      <main className={classes.main}>
        <ul>
          <li className={classes.list}>
            <NavLink
              onClick={removeTickHandler}
              style={{
                color : props.mails.seen === false ? "grey" : "blue",
              }}
              to={`/${props.type}message/${props.mails.id}`}
            >
              {props.mails.message}
            </NavLink>
          </li>
        </ul>
      </main>
    </React.Fragment>
  );
};

export default Inbox;
