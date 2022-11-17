import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  // 에러 정보를 저장함.
  const [error, setError] = useState(null);
  // 현재 서버와 통신 상태를 저장함.
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    console.log(email, password);
    setError(null); // 아직 에러가 없음.
    setIsPending(true); // 통신을 진행중임.

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("로그인 확인, user: ", user);

        if (!user) {
          throw new Error("로그인에 실패했습니다.");
        }

        dispatch({ type: "login", payload: user });

        setError(null);
        setIsPending(false);
      })
      .catch((err) => {
        const { error, message } = err;
        console.error(`${error}: ${message}`);
        setError(`${error}: ${message}`);
        setIsPending(false);
      });
  };

  return { error, isPending, login };
};

export default useLogin;
