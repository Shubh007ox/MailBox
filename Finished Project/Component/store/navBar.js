import React, { useContext } from 'react';
import { Navbar, Nav,Button } from 'react-bootstrap';
import './MailboxNavbar.css';
import AuthContext from '../Store2/auth-Context';
import { Link, NavLink } from 'react-router-dom';

const MailboxNavbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    console.log('Logout SucessFull')
    authCtx.logout();
  }

  return (
    <Navbar className="mailbox-navbar" expand="lg">
      {!isLoggedIn && (
        <Link to='/'>
          <Navbar.Brand className="mailbox-brand">Mailbox</Navbar.Brand>
        </Link>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {
        isLoggedIn && (
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto mailbox-nav-links">
          <NavLink to={'/welcome'}>
            <Nav>Welcome</Nav>
          </NavLink>
          <NavLink to={'/mailbox'}>
          <Nav> MailBox </Nav>
          </NavLink>
          {/* <NavLink to={'/message'}>
          <Nav> Inbox 2 </Nav>
          </NavLink> */}
          {/* <NavLink to={'/sents'}>
          <Nav>Sent</Nav>
          </NavLink> */}
          <NavLink to={'/compose'}>
          <Nav >Compose </Nav>
          </NavLink>
          <span>
          <Button onClick={logoutHandler}>Logout</Button>
          </span>
        </Nav>
        {
          isLoggedIn && (
            <div className="mailbox-search">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>

          )
        }

      </Navbar.Collapse> ) }
    </Navbar>
  );
};

export default MailboxNavbar;


{/* <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto mailbox-nav-links">
          <Nav.Link href="#inbox">Inbox</Nav.Link>
          <Nav.Link href="#sent">Sent</Nav.Link>
          <Nav.Link href="#drafts">Drafts</Nav.Link>
        </Nav>
        <div className="mailbox-search">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
      </Navbar.Collapse> */}


      // <Link to={'/indox'}>
      // <Nav.Link href="#inbox">Inbox</Nav.Link>
      // </Link>
      // <Link to={'/sents'}>
      // <Nav.Link href="#sent">Sent</Nav.Link>
      // </Link>
      // <Link to={'/compose'}>
      // <Nav.Link href="#drafts">Drafts</Nav.Link>
      // </Link>
      // <Button onClick={logoutHandler}>Logout</Button>
