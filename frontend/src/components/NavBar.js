import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { propertyContext } from '../providers/PropertyProvider';
import Login from './Login';
import Register from './Register';
export default function NavBar() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const toggleRegisterModal = () => {
    setShowRegister(!showRegister);
  };

  const toggleLoginModal = () => {
    setShowLogin(!showLogin);
  };

  const {setLoggedInUser, state} = useContext(propertyContext);
  const user = state.loggedUser;
///can be removed
  // const isuserLoggedin = localStorage.getItem("token") !== ""
  // const useremail = localStorage.getItem("email")
  // const type = localStorage.getItem("usertype")
  // const userid= localStorage.getItem("userid")

  const logout =()=> {
    setLoggedInUser("");
    ///can be removed
    // localStorage.setItem("token","")
    // localStorage.setItem("email","")
    // localStorage.setItem("usertype","")
    // localStorage.setItem("userid","")
    // window.location.reload(false);
}
  return (
    <Navbar className="homebidder-nav" variant="dark" bg="dark" sticky="top" collapseOnSelect expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img
          alt="homebidder-icon"
          src="/home.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          />{' '}
          HomeBidder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Listings</Nav.Link>
          {!user.length && (
            <>
            <p
                    clasName="p-3 mb-2 bg-white text-dark"
                    onClick={toggleLoginModal}
                  >
                    
                    <Nav.Link className="text-white bg-dark">Login</Nav.Link>
                  </p>
                  <p
                    clasName="p-3 mb-2 bg-white text-dark"
                    onClick={toggleRegisterModal}
                  >
                    {" "}
                    <Nav.Link className="text-white bg-dark">Register</Nav.Link>
                  </p>
            </>
          )}
        
          {(user  && user.user_type === 2) && (
          <NavDropdown title={user.email} id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="getRoute">My Favourites</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/properties/new">Create New Listing</NavDropdown.Item>
            <NavDropdown.Divider />
            
            <NavDropdown.Item  onClick={logout} as={Link} to="logout">
              Logout
            </NavDropdown.Item> 
          </NavDropdown>
          )}

          {(user  && user.user_type === 1) && (
          <NavDropdown title={user.email} id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="getRoute">Pending Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item  onClick={logout} as={Link} to="logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
      <Register
          show={showRegister}
          toggleRegisterModal={toggleRegisterModal}
        ></Register>
        <Login show= {showLogin}
           toggleLoginModal={toggleLoginModal}>
        </Login>
    </Navbar>
  );
}
