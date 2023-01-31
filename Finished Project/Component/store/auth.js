// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import { Button } from "react-bootstrap";
// // import FormLabel from "react-bootstrap";
// import { Form } from "react-bootstrap";

// function LoginPage() {
//     return(
//         <Form>
//         {/* <FormLabel>input</FormLabel> */}
//         <Button>Clicl me</Button>
//         </Form>
//     )
// }

// export default LoginPage;
import React, { useContext, useState,useRef } from "react";
import { Form, Button, Container, Nav, NavItem, NavLink, useAccordionButton } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import classes from './pages.module.css';
import AuthContext from "../Store2/auth-Context";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [nav,setnav] = useState(classes.btn)
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();


  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login or signup logic here
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredConfirmPass;
    if(!isLogin){
      enteredConfirmPass = confirmpasswordInputRef.current.value;
    }
    localStorage.setItem('enteredEmail',JSON.stringify(enteredEmail))

    // optional: Add validation
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuy-Lt3HWAxoHO24zpXtjYsK_V4u1vAdE';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuy-Lt3HWAxoHO24zpXtjYsK_V4u1vAdE';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        confirmPass : enteredConfirmPass,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        if (res.ok) {
          console.log('Login SuccessFull')
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log('Login SucessFull')
       const expireTokentime = new Date( new Date().getTime() + +data.expiresIn * 1000);
        authCtx.login(data.idToken,expireTokentime.toISOString());    
        history.replace('/welcome');
      })
      .catch((err) => {
        alert(err.message);
      });
    history.push("/");
  };

  return (
    <Container className={classes.container}>
      <Nav className="justify-content-center">
        <NavItem className={classes['nav-item']}>
          <NavLink onClick={() => setIsLogin(true,setnav(classes.btns))} className={classes['nav-link']}>Login</NavLink>
        </NavItem>
        <NavItem className={classes['nav-item']}>
          <NavLink onClick={() => setIsLogin(false)} className={classes['nav-link']}>Signup</NavLink>
        </NavItem>
      </Nav>
      <Form onSubmit={handleSubmit}>
        {/* {!isLogin && (
          <Form.Group controlId="formBasicName" className={classes['form-group']}>
            <Form.Label className={classes['form-label']}>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" className={classes['form-control']}/>
          </Form.Group>
        )} */}
        <Form.Group controlId="formBasicEmail" className={classes['form-group']}>
          <Form.Label className={classes['form-label']}>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" className={classes['form-control']}  ref={emailInputRef}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className={classes['form-group']}>
          <Form.Label  className={classes['form-label']}>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" className={classes['form-control']} ref={passwordInputRef}/>
        </Form.Group>

        {!isLogin && (
          <Form.Group controlId="formBasicConfirmPassword" className={classes['form-group']}>
            <Form.Label className={classes['form-label']}>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" className={classes['form-control']} ref={confirmpasswordInputRef}/>
          </Form.Group>
        )}

        <Button variant="primary" type="submit" className={classes.btn}>
          {isLogin ? "Login" : "Signup"}
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
