import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase";

function Log() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div className="reg-login-cont">
      <div className="register-cont">
        <h3> Register User </h3>
        <div>
          <div >
            <input className="login-style"
              placeholder="Email..."
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            /></div>
          <br></br>
          <div>
            <input type="password"
            className="login-style"
              placeholder="Password..."
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            /></div>
        </div>
        <br />
        <button className="login-button" onClick={register}> Create User</button>
      </div>

      <div className="register-cont">
        <h3> Login </h3>
        <div>
          <div>
            <input className="login-style"
              placeholder="Email..."
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            /></div>
          <br />
          <div>
            <input type="password"
            className="login-style"
              placeholder="Password..."
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            /></div>
        </div>
        <br />
        <button className="login-button" onClick={login}> Login</button>

      </div>

      </div>
      <br></br>
    <div className="signout-cont">
      <h4> User Logged In: </h4>
      <t>{user?.email}</t>
      <br /><br></br>
      <button className="login-button" onClick={logout}> Sign Out </button>
    </div>
    </div>
  );
}

export default Log;