import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Divider from "antd/lib/divider";
import { Avatar } from "antd";
import { UserOutlined, LeftOutlined } from "@ant-design/icons";

type Ticket = {
    subject: string;
    status: string;
    created_at: string;
    description: string;
};

const TicketDetails: NextPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [ticketDetails, setTicketDetails] = useState<Ticket | undefined>();
    const [requesterName, setRequesterName] = useState("");
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
                    setTicketDetails(response.data.ticket);
                    axios
                        .post("/api/getUsername", {
                            username: Cookies.get("username"),
                            password: Cookies.get("password"),
                            userid: response.data.ticket.requester_id,
                        })
                        .then((response) => {
                            setRequesterName(response.data.user.name);
                        });
                })
                .catch((error) => {
                    console.log(error.response.status);
                    if (error.response.status == 401) {
                        router.push("/");
                    } else if (error.response.status == 404) {
                        setErrorMessage("Ticket does not exist");
                    }
                });
        }
    }, [tid]);
    return (
        <>
            {ticketDetails != undefined ? (
                <div className="h-screen w-screen flex-col flex items-center">
                    <div
                        style={{
                            backgroundImage: "url(/background2.jpg)",
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
                    <div
                        className="self-start mb-5 border rounded-full p-3 items-center justify-center flex-row flex bg-blue-200 mt-5 ml-5 cursor-pointer"
                        onClick={() => router.push("/home")}
                    >
                        <LeftOutlined /> Back to all tickets
                    </div>
                    <div className="w-3/4 border flex-col flex h-full p-5 rounded-xl bg-white mb-10">
                        <div className="flex-row flex items-center justify-between ">
                            <span className="font-bold text-lg">
                                Subject: {ticketDetails.subject}
                            </span>
                            {ticketDetails.status == "open" ? (
                                <div className="h-8 w-8 items-center flex-col flex justify-center text-center rounded bg-red-500">
                                    <span className="text-white text-md">
                                        O
                                    </span>
                                </div>
                            ) : ticketDetails.status == "pending" ? (
                                <div className="h-8 w-8 items-center flex-col flex justify-center text-center rounded bg-blue-500">
                                    <span className="text-white text-md">
                                        P
                                    </span>
                                </div>
                            ) : (
                                <div className="h-8 w-8 items-center flex-col flex justify-center text-center rounded bg-gray-500">
                                    <span className="text-white text-md">
                                        S
                                    </span>
                                </div>
                            )}
                        </div>
                        <Divider />
                        <div className="flex-row flex justify-between w-full">
                            <div>
                                <Avatar
                                    className="items-center justify-center flex flex-col"
                                    size={48}
                                    icon={<UserOutlined />}
                                />
                                <span className="ml-2 font-bold">
                                    {requesterName}
                                </span>
                            </div>
                            <div className="items-center flex-col flex justify-center">
                                <span className="">
                                    Created at:{" "}
                                    {new Date(ticketDetails.created_at)
                                        .toString()
                                        .slice(0, 21)}
                                </span>
                            </div>
                        </div>
                        <div className="w-full mt-8">
                            {ticketDetails.description}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-screen w-screen items-center justify-center flex-col flex">
                    
                    <span className="text-lg text-red-500">{errorMessage}</span>
                    <div
                        className=" border rounded-full p-3 items-center justify-center flex-row flex bg-blue-200 mt-5 ml-5 cursor-pointer"
                        onClick={() => router.push("/home")}
                    >
                        <LeftOutlined /> Back to all tickets
                    </div>
                </div>
            )}
        </>
    );
};

export default TicketDetails;
