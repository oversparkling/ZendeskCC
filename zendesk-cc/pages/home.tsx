import axios from "axios";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";



const Dashboard: NextPage = () => {
  const [requestData, setRequestData] = useState<any[]>([])
  const router = useRouter();
  useEffect(() => {
    const response = axios
      .post("/api/loadAllTickets", {
        username: Cookies.get("username"),
        password: Cookies.get("password"),
        userid: Cookies.get("user_id"),
      })
      .then((response) => {
        console.log(response.data)
        setRequestData(response.data.tickets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className = "w-full flex-col flex items-center justify-center">
      {requestData.length>0 &&
        requestData.map((element) => {
            console.log(element)
          return <div>{element.raw_subject}</div>;
        })}
    </div>
  );
};

export default Dashboard;
