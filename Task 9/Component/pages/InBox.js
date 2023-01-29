import React from "react";
import classes from './InBoxs.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const InboxMess = () => {
    const mails =  useSelector((state) => state.mailManager.receive);
    const {id} = useParams();

    console.log(mails,'===Messges')
    let arr = mails.find((index) => index.id == id);

    console.log(arr)
    return(
        <React.Fragment>
            <h1 className={classes.heading}>InBOX</h1>
            <main className={classes.main}>
                <h5>{arr ? arr.subject : "loading.."}</h5>
                <p>{arr ? arr.message : "loading..."}</p>
            </main>
        </React.Fragment>
    )
};

export default InboxMess;