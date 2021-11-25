import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import ZendeskAPI from "./api/validate";
import Cookies from "js-cookie";

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const login = async () => {
     await axios
      .post("/api/validate", { username: username, password: password })
      .then((response) => {
        console.log(response.data);
        Cookies.set("username", username);
        Cookies.set("password", password);
        Cookies.set("user_id", response.data.id);
        router.push("/home");
      })
      .catch(() => {
        setErrorMessage("Invalid Credentials");
      });
  };
  return (
    <div className="w-screen h-screen flex-col flex items-center justify-center">
      <div
        style={{
          backgroundImage: "url(/background.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          opacity: 0.2,
          position: "absolute",
          zIndex: -1,
        }}
      />
      <div className="w-1/4 rounded-xl py-10 border flex-col items-center flex bg-white">
        <Image src="/zendesklogo.svg" height="40" width="200" />

        <span>Sign in to Account</span>
        <span className="text-red-500">{errorMessage} </span>
        <input
          placeholder="Email"
          className="rounded-xl w-2/3 border p-2 mt-5 "
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          placeholder="Password"
          className="rounded-xl w-2/3 border p-2 mt-5"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        ></input>
        <div
          className=" rounded-xl px-5 py-1 border mt-5 cursor-pointer"
          onClick={() => login()}
        >
          Sign in
        </div>
      </div>
    </div>
  );
};

export default Home;
