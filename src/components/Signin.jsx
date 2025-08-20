import React from "react";
import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import signInBg from "../../public/signin_bg.jpg"

const Signin = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const nameValue = name.current?.value || "";
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const message = checkValidData(
      emailValue,
      passwordValue,
      isSignInForm ? null : nameValue
    );

    if (message) {
      setErrorMessage(message);
      return;
    }

    setErrorMessage(null);

    // Proceed with Sign In or Sign Up logic here
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          // Set display name separately
          updateProfile(auth.currentUser, {
            displayName: nameValue,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              // ...updating the store
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMessage(errorCode);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode);
        });
    }
  };

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover brightness-50"
          src={signInBg}
          alt="Background"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60" /> */}
      </div>

      <Header />

      <div className="flex justify-center items-center h-[70vh]">
        <form
          noValidate
          onSubmit={(e) => e.preventDefault()}
          className="bg-black/60 px-16 py-12 rounded-md space-y-6 w-[90%] max-w-md"
        >
          <h2 className="text-3xl font-bold text-left text-white">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>

          <div className="flex flex-col gap-6">
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded bg-white/6 text-white placeholder-white/50 border border-gray-500 focus:border-2 focus:border-white focus:outline-none"
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-white/6 text-white placeholder-white/50 border border-gray-500 focus:border-2 focus:border-white focus:outline-none"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-white/6 text-white placeholder-white/50 border border-gray-500 focus:border-2 focus:border-white focus:outline-none"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm -mt-2">{errorMessage}</p>
          )}

          <button
            onClick={handleButtonClick}
            type="submit"
            className="w-full bg-white hover:bg-gray-200 transition duration-300 text-black font-bold py-2 rounded cursor-pointer"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {isSignInForm && (
            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-red-600" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
          )}

          <div className="text-sm text-gray-300">
            {isSignInForm ? "New to gptflix?" : "Already have an account?"}{" "}
            <a
              onClick={toggleForm}
              href="#"
              className="font-semibold text-white hover:underline"
            >
              {isSignInForm ? "Sign up now." : "Sign in now."}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
