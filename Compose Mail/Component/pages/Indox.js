import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Indox(){
    const history = useHistory();
    const ComposeMailHandler = () => {
        history.push('/compose')


    }
    return(
        <div>
        <h1>welcome to InBox</h1>
        <Button onClick={ComposeMailHandler}>Compose Mail</Button>
        </div>
    )
}

export default Indox;