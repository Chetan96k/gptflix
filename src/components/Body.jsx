import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");   // redirect to Browse if logged in
      } else {
        dispatch(removeUser());
        navigate("/");         // redirect to Signin if logged out
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return null; // this is just a logic wrapper
};

export default Body;
