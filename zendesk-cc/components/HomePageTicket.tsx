import Slide from "react-reveal/Fade";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { relative } from "path";

type Props = {
    subject: string;
    description: string;
    requester: string;
    status: string;
    priority: string;
    id: string;
};

// This component is an abstracted ticket to allow easy rendering of ticket details on our client, 
// while also allowing us to reuse/easily

export default function HomePageTicket(props: Props) {
    const router = useRouter();
    const [requesterName, setReqesterName] = useState("")
    useEffect(() => {
        axios
            .post("/api/getUsername", {
                username: Cookies.get("username"),
                password: Cookies.get("password"),
                userid: Cookies.get("user_id"),
            })
            .then((response) => {
                console.log(response.data)
                setReqesterName(response.data.user.name);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <Slide bottom>
            <div className="inline-block px-3 w-1/3">
                <div className="overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out w-full bg-white shadow-sm p-3 mx-1 my-3 cursor-pointer" onClick = {()=>router.push("/ticket/"+props.id)}>
                    <div className="mt-4 pl-3 mb-2 flex justify-between ">
                        <div className="mr-4">
                            <p className="text-lg font-semibold text-gray-900 mb-0">
                                {props.subject}
                            </p>
                            <p
                                className="font-medium mt-0 "
                                style={{ color: "#32BEA6" }}
                            >
                                Requested by: {requesterName}
                            </p>
                            {
                                props.status == "open"?<div className = "h-4 w-4 items-center flex-col flex justify-center text-center rounded bg-red-500">
                                <span className = "text-white text-xs">O</span>
                            </div>: props.status == "pending"? <div className = "h-4 w-4 items-center flex-col flex justify-center text-center rounded bg-blue-500">
                                <span className = "text-white text-xs">P</span>
                            </div>:<div className = "h-4 w-4 items-center flex-col flex justify-center text-center rounded bg-gray-500">
                                <span className = "text-white text-xs">S</span>
                            </div>
                            }
                            {/* <div className = "h-4 w-4 items-center flex-col flex justify-center text-center rounded bg-red-500">
                                <span className = "text-white text-xs">O</span>
                            </div>
                            <div className = "h-4 w-4 items-center flex-col flex justify-center text-center rounded bg-blue-500">
                                <span className = "text-white text-xs">P</span>
                            </div>
                            <div className = "h-4 w-4 items-center flex-col flex justify-center text-center rounded bg-gray-500">
                                <span className = "text-white text-xs">S</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
}
