import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [validationMessage, setValidationMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    if (confirmPassword.current && (confirmPassword.current.value !== password.current.value)){
      setValidationMessage('Password did not match');
    } else {
      setValidationMessage(message);
      if(message) return;

      if (!isSignIn) {
          // Sign up 
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMessage(errorCode+": "+errorMessage);
        });
      } else {
          // Sign in 
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          setValidationMessage(errorCode);
        });


      }

    }
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="logo"
        />
      </div>
      <form 
      onSubmit={(e) => e.preventDefault()}
      className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        <input
          ref={email}
          type="text"
          placeholder="Enter Email"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {!isSignIn && (
          <input
          ref={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleClick}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 mb-2 w-full text-red-700 text-lg font-bold  ">{validationMessage}</p>
        <p className="cursor-pointer" onClick={toggleSignIn}>
          {isSignIn
            ? "Not registered ? Sign up"
            : "Already registered ? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
