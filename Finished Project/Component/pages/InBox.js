import React from "react";
import classes from './InBoxs.module.css';
import { useHistory, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import useHttp from "../../Hook/usehttp";
import { handleEmailActions } from "../Store2/sentMail-Reducer";
import { Button } from "react-bootstrap";


const InboxMess = () => {
    const mails =  useSelector((state) => state.mailManager.receive);
    const {id} = useParams();
    const Email = localStorage.getItem('enteredEmail')
    const Email1 = Email.replace('@','')
    const Email2 = Email1.replace('.','')
    const [error,sendRequest] = useHttp()
    const dispatch = useDispatch();
    const history = useHistory()

    console.log(mails,'===Messges')
    let arr = mails.find((index) => index.id === id);

    console.log(arr)
    const deleteMailHandler = () => {
        const responseHandler = () => {
            dispatch(handleEmailActions.deleteMail(arr.id))
            alert('Message deleted SucessFull')
            history.replace('/mailbox/receiveBox')
        }
        sendRequest({
            request : 'delete',
            url : `https://authentication-61603-default-rtdb.firebaseio.com/receive${Email2}/${arr.id}.json`,
            header : {'Content-type' : 'application/json'}
        },
        responseHandler
        );
    }
    return(
        <React.Fragment>
            {error && <h2>{error}</h2>}
            <h1 className={classes.heading}>InBOX</h1>
            <main className={classes.main}>
                <h5>{arr ? arr.subject : "loading.."}</h5>
                <p>{arr ? arr.message : "loading..."}</p>
                <Button onClick={deleteMailHandler} className={classes.delete}>Delete</Button>
            </main>
        </React.Fragment>
    )
};

export default InboxMess;