import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
        <Image src = "/zendesklogo.svg" height = "40" width = "200"/>

        <span>
          Sign in to Account
        </span>
        <input placeholder = "Email" className = "rounded-xl w-2/3 border p-2 mt-5 " onChange = {(e) => setUsername(e.target.value)}></input>
        <input placeholder = "Password" className = "rounded-xl w-2/3 border p-2 mt-5"  onChange = {(e) => set(e.target.value)}></input>
        <div className = " rounded-xl px-5 py-1 border mt-5">
          Sign in
        </div>
      </div>
    </div>
  );
};

export default Home;
