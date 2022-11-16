import { useState } from "react";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = () => {
    setError(null);
    setIsPending(true);

    signOut(appAuth)
      .then(() => {
        setError(null);
        setIsPending(false);
        // Sign-out successful.
        dispatch({ type: "logout" });
      })
      .catch((err) => {
        // An error happened.
        const { error, message } = err;
        console.error(`${error}: ${message}`);
        setError(`${error}: ${message}`);
        setIsPending(false);
      });
  };

  return { error, isPending, logout };
};

export default useLogout;
