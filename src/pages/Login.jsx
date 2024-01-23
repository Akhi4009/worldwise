import PageNav from "../components/navbar/PageNav";
import styles from "./Login.module.css";
import { useState } from "react";
import Button from "../components/layout/Button";
import {AuthProvider, useAuth} from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("akhil@example.com");
  const [password, setPassword] = useState("akhil");
  const{login, isAuth} = useAuth()
  const navigate = useNavigate();
  function handleLogin(e){
    e.preventDefault();
    if(email && password){
      login(email,password);
    }
  }

  useEffect(()=>{
    if(isAuth) navigate("/app", {replace:true});
  },[isAuth])

  return (
    <main className={styles.login}>
    <PageNav/>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">
          Login
          </Button>
        </div>
      </form>
    </main>
  );
}
