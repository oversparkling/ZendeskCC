import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const TicketDetails: NextPage = () => {
    const [ticketDetails, setTicketDetails] = useState();
    const router = useRouter();
    const { tid } = router.query;
    useEffect(() => {
        if (tid != undefined) {
            axios
                .post("/api/getTicketDetails", {
                    username: Cookies.get("username"),
                    password: Cookies.get("password"),
                    ticketId: tid,
                })
                .then((response) => {
                    console.log(response.data);
                    setTicketDetails(response.data);
                })
                .catch(() => {
                    // router.push("/");
                });
        }
    }, [tid]);
    return (
        <div className = "h-screen w-screen ">
            <div>
                
            </div>
        </div>
    );
};

export default TicketDetails;
