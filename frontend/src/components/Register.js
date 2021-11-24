import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
export default function RegistForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
   const [userEmailReg, setUseEmailReg] = useState("");
   const [passwordReg, setPasswordReg] = useState("");
   const register = (e) => {
    e.preventDefault()
    axios.post("api/users/register", {
      first_name:firstName,
      last_name:lastName,
      email:userEmailReg,
      password: passwordReg

    }).then((response) => {
      console.log(response);
    });
  };
  
  const history = useHistory();
      
      const handleClick = () => history.push("/login");
      const [show, setShow] = useState(false);
  
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
  return(
        <div className="register">
             <Button variant="primary" onClick={handleShow}>
          Register 
           </Button>
           <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
        <Modal.Title>log in to continue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="registerform" onSubmit={register} >
            <div className="form-group">
                    <label >First Name</label>
                    <input type="firstName"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        onChange={(e) => {
                            setFirstName(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="LastName"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        onChange={(e) => {
                            setLastName(e.target.value)}}
                    />
                </div>

                <div className="form-group ">
                <label >Email </label>
                <input type="email"
                       className="form-control"
                       id="email"
                       placeholder="Enter email"
                        value={userEmailReg}
                       onChange={(e) => {
                        setUseEmailReg(e.target.value)}}
                />

                </div>

                <div className="form-group">
                    <label >Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => {
                        setPasswordReg(e.target.value)}}

                    />
                </div>
                <div className="form-group">
                <button 
                    type="submit"
                    className="regiter-button" >
                    register
                </button>
                </div>
            </form>
            </Modal.Body>
               <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              cancel
            </Button>
               <Button variant="primary" className="login-button" type ="submit" onClick={handleClose}>
              close
            </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
  }