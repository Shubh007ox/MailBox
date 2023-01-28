import React from "react";
import classes from './Inbox.module.css';
import useHttp from "../../Hook/usehttp";
import { useSelector,useDispatch } from "react-redux";
import { handleEmailActions } from "../Store2/sentMail-Reducer";


const Inbox = (props) => {
  const [error,sendRequest] = useHttp();
  const dispatch = useDispatch();
  console.log("inside Inbox");
  // const Email = localStorage.getItem('enteredEmail');
  // const Email1 = Email.replace('@','');
  // const Email2 = Email1.replace('.','');


  return (
    <div>
      <main>
        <ul>
          <li className={classes.list}>{props.mails.message} Welcome</li>
        </ul>
      </main>
    </div>
  );
}

export default Inbox;
