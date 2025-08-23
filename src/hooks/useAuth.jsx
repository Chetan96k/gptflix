import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const useAuth = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // 🔹 loading state

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleAuth = () => {
    setLoading(true); // 🔹 start loader
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
      setLoading(false); // stop loader on error
      return;
    }

    setErrorMessage(null);

    // Proceed with Sign In or Sign Up logic here
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // Set display name separately
          updateProfile(auth.currentUser, {
            displayName: nameValue,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .finally(() => setLoading(false));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode);
          setLoading(false); // stop loader
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(errorCode);
        })
        .finally(() => setLoading(false)); // stop loader
    }
  };

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return {
    isSignInForm,
    errorMessage,
    loading,
    name,
    email,
    password,
    toggleForm,
    handleAuth,
  };
};
