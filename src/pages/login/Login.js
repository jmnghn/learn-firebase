import { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleData = (e) => {
    const { type, value } = e.target;

    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>로그인</legend>
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

        <button type="submit" className={styles.btn}>
          로그인
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
