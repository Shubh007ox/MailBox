import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import classes from "./compose.module.css";
// import JoditEditor from "jodit-react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { useSelector,useDispatch} from "react-redux";
import { handleEmailActions } from "../Store2/sentMail-Reducer";
import useHttp from "../../Hook/usehttp";


function ComposeMail() {
  const [message,setMessage] = useState();
  const [to,setTO] = useState();
  const MailInputRef = useRef();
  const SubInputRef = useRef();
  const [error,sendRequest] = useHttp();
  const Email = localStorage.getItem('enteredEmail')
  const enteredM = Email.replace('@','')
  const enterM = enteredM.replace('.','')
  // const toMail = MailInputRef;
  const dispatch = useDispatch();

  const refHandler = (event) => {
    setMessage(event.blocks[0].text)
  };
  
  const MailSendHandler = (event) => {
    event.preventDefault();

    const enteredMail = MailInputRef.current.value;
    const enteredSubject = SubInputRef.current.value;
    console.log(enteredMail, enteredSubject, message, "==>In Compose mail");
    localStorage.setItem('email',enteredMail)
    // const SendM = localStorage.getItem('email')
    const SendMail = to.replace('@','')
    const SendMailFinal = SendMail.replace('.','')
    console.log(SendMailFinal)

    const objectData = {
      message : message,
      subject : enteredSubject,

    }
    if(enteredMail.trim().length === 0){
      alert('Ples enter email adress')
    } else if(!enteredMail.includes('@') || !enteredMail.includes('.') )
    {
      alert('Please enter valid email Id')
    }
    else{
      const resData = () => {
        const responseHandler = (res) => {
          console.log(res.data.name, "==> Resource");
          let emailWithId = { ...objectData, id: res.data.name };
          dispatch(handleEmailActions.setSendMail(emailWithId));
          alert('Mail sent')
        };
        sendRequest(
          {
            request: "post",
            url: `https://authentication-61603-default-rtdb.firebaseio.com/sent${SendMailFinal}.json`,
            data: objectData,
            header: { "Content-type": "application/json" },
          },
          responseHandler
        );
      };

      sendRequest(
        {
          request: "post",
          url: `https://authentication-61603-default-rtdb.firebaseio.com/receivedd${enterM}.json`,
          data: objectData,
          header: { "Content-type": "application/json" },
        },
        resData
      );
    }

  };

  return (
    <Container className={classes.container}>
      <h2>{error}</h2>
      <Form onSubmit={MailSendHandler}>
        <FormGroup controlId="formTo" className={classes["form-group"]}>
          <FormLabel className={classes["form-label"]}>To</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter recipient email"
            value={to}
            // onChange={}
            onChange={(e) => setTO(e.target.value)}
            className={classes["form-control"]}
            ref={MailInputRef}
          />
        </FormGroup>
        <FormGroup controlId="formSubject" className={classes["form-group"]}>
          <FormLabel className={classes["form-label"]}>Subject</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter subject"
            // value={subject}
            // onChange={}
            ref={SubInputRef}
            className={classes["form-control"]}
          />
        </FormGroup>
        <FormGroup controlId="formMessage" className={classes["form-group"]}>
          <FormLabel className={classes["form-label"]}>Message</FormLabel>
          {/* <FormControl
            as="textarea"
            rows="5"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={classes["form-control"]}
          > */}
              <Editor
               toolbarClassName="toolbarClassName"
               wrapperClassName="wrapperClassName"
               editorClassName="editorClassName"
               placeholder="    your message"
               editorStyle={{
                 border: "1px solid antiquewhite",
                 paddingBottom: "145px",
               }}
               onChange={refHandler}
              
            />
        {/* </FormControl> */}
        </FormGroup>
        <Button variant="primary" type="submit" className={classes.btn}>
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default ComposeMail;

 //   else{
  //     const resData = () => {
  //       const responseHandler = (res) => {
  //         console.log(res.data.name)
  //         let emailWithId = {...ObjectInfo,id: res.data.name};
  //         dispatch(handleEmailActions.setSendMail(emailWithId));
          
  //       };
  //       sendRequest({
  //         request : "post",
  //         url : `https://authentication-61603-default-rtdb.firebaseio.com/sent${mailId2}.json`,
  //         data : ObjectInfo,
  //         header : { "Content-type": "application/json" },
  //       },
  //       responseHandler

  //       )
        
  //     };
  //   };

  //   sendRequest(
  //     {
  //     request : "POST",
  //     url : `https://authentication-61603-default-rtdb.firebaseio.com/sent${to}.json`,
  //     data : ObjectInfo,
  //     header: { "Content-type": "application/json" },
  //   },
  //   resData

  //   )


  // };
    {/* <FormControl
            as="textarea"
            rows="5"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={classes["form-control"]}
          > */}

// '---------------------------------------------------------------------'
// const [to, setTo] = useState("");
// const [subject, setSubject] = useState("");
// const dispatch = useDispatch();
// const [error,sendRequest] = useHttp();
// const [message, setMessage] = useState("");
// const editor = useRef();
// const toMailinputRef = useRef();
// const [mailEdit, setmailEdit] = useState("");

// const MailhandleSubmit = (event) => {
//   event.preventDefault();
//   const str = mailEdit
//   const reMess =  str
//   .replaceAll('<p>', '')
//   .replaceAll('</p>', '')
//   .replaceAll('<strong>', '')
//   .replaceAll('</strong>', '')
//   console.log(reMess)
//   console.log("Sending mail to:", to);
//   console.log("Subject:", subject);
//   console.log('Message' , reMess);

//   const enteredSendMailId = toMailinputRef.current.value;
//   const userMail = to.replace('@','')
//   const UserMails = userMail.replace('.','')
//   console.log(enteredSendMailId)
//   const  mailId = localStorage.getItem('enteredEmail')
//   const  mailId1 = mailId.replace('@','');
//   const mailId2 = mailId1.replace('.','');
//   console.log(mailId2)

//   const ObjectInfo = {
//     subject : subject,
//     message : reMess,
//   }
//   if(to.trim().length === 0){
//     alert('Ples enter Email adresss')

//   }else if (!to.includes('@') || !to.includes('.')){
//     alert('Ples enter a valid email id')
//   }
//   else{
//     const resData = () => {
//       const responseHandler = (res) => {
//         console.log(res.data.name, "==> Resource");
//         let emailWithId = { ...ObjectInfo, id: res.data.name };
//         dispatch(handleEmailActions.setSendMail(emailWithId));
//       };
//       sendRequest(
//         {
//           request: "post",
//           url: `https://authentication-61603-default-rtdb.firebaseio.com/sent${mailId2}.json`,
//           data: ObjectInfo,
//           header: { "Content-type": "application/json" },
//         },
//         responseHandler,
//         console.log('sent SucesssFull and')
//       );
//     };

//     sendRequest(
//       {
//         request: "post",
//         url: `https://authentication-61603-default-rtdb.firebaseio.com/sent${UserMails}.json`,
//         data: ObjectInfo,
//         header: { "Content-type": "application/json" },
//       },
//       resData,
//       console.log('sent SucesssFull')
//     );
//   }

// };
