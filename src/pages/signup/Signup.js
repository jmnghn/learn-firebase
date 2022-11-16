import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignup();

  const handleData = (e) => {
    const { type, value } = e.target;

    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    } else if (type === "text") {
      setDisplayName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, displayName });
    signup(email, password, displayName);
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor="myEmail">Email: </label>
        <input
          type="email"
          id="myEmail"
          required
          value={email}
          onChange={handleData}
        />
        <label htmlFor="myPassword">Password: </label>
        <input
          type="password"
          id="myPassword"
          required
          value={password}
          onChange={handleData}
        />
        <label htmlFor="myNickname">Nickname: </label>
        <input
          type="text"
          id="myNickname"
          required
          value={displayName}
          onChange={handleData}
        />

        <button type="submit" className={styles.btn}>
          회원가입
        </button>
      </fieldset>
    </form>
  );
};

export default Signup;
