import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  // 에러 정보를 저장함.
  const [error, setError] = useState(null);
  // 현재 서버와 통신 상태를 저장함.
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    console.log(email, password, displayName);
    setError(null); // 아직 에러가 없음.
    setIsPending(true); // 통신을 진행중임.

    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("로그인 확인, user: ", user);

        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }

        // 닉네임은 사용자 프로필을 업데이트해서 저장.
        updateProfile(appAuth.currentUser, {
          displayName,
        })
          .then(() => {
            setError(null);
            setIsPending(false);
            dispatch({ type: "login", payload: user });
          })
          .catch((err) => {
            const { error, message } = err;
            setError(`${error}: ${message}`);
            setIsPending(false);
          });
      })
      .catch((err) => {
        const { error, message } = err;
        console.error(`${error}: ${message}`);
        setError(`${error}: ${message}`);
        setIsPending(false);
      });
  };

  return { error, isPending, signup };
};

export default useSignup;
