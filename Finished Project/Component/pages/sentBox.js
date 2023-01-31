import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from './sentBox.module.css';
import useHttp from "../../Hook/usehttp";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleEmailActions } from "../Store2/sentMail-Reducer";
import { useHistory } from "react-router-dom";

function SentBox(){
    const mails = useSelector((state) => state.mailManager.sent);
    const { id } = useParams();
    const [error,sendRequest] = useHttp();
    const history = useHistory();
    const dispatch = useDispatch();
    const Email = localStorage.getItem('enteredEmail')
    const Email1 = Email.replace('@','')
    const Email2 = Email1.replace('.','')
    let arr = mails.find((index) => index.id === id);
    const deleteMailHandler = () => {
        const responseHandler = () => {
            dispatch(handleEmailActions.deleteMail(arr.id))
            alert('Email Deleted')
            history.replace('/mailbox/inbox')
        }
        sendRequest(
            {
            request : "delete",
            url : `https://authentication-61603-default-rtdb.firebaseio.com/sent${Email2}/${arr.id}.json`,
            header : {'Content-type' : 'application/json'}
            },
        responseHandler
        )


    }
    return(
        <React.Fragment>
            {error} <h3>{error}</h3>
            <h1 className={classes.heading}>Sent</h1>
            <main className={classes.main}>
                <h5>{arr ? arr.subject : 'loading..'}</h5>
                <p>{arr ? arr.message : 'loadind Ples We are Fecthing Your Mails'}</p>
                <Button onClick={deleteMailHandler} className={classes.delete}>Delete</Button>

            </main>

        </React.Fragment>
    )
}

export default SentBox;