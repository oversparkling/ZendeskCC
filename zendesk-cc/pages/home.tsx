import axios from "axios";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { Tabs } from "antd";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import HomePageTicket from "../components/HomePageTicket";
import Loading from "../components/Loading";

//This page is the logged in page, rendering the list of tickets at a glance
const Dashboard: NextPage = () => {
    //Provide user with understanding on error received
    const [errorMessage, setErrorMessage] = useState("");

    //List of tickets
    const [requestData, setRequestData] = useState<any[]>([]);

    //Loading that is used for prematurely rendering the page
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //Number of tickets to be rendered on one page
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 25,
    });

    const router = useRouter();
    useEffect(() => {
        //populating tickets
        axios
            .post("/api/loadAllTickets", {
                username: Cookies.get("username"),
                password: Cookies.get("password"),
                userid: Cookies.get("user_id"),
            })
            .then((response) => {
                console.log(response.data);
                setRequestData(response.data.tickets);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.response.status);
                if (error.response.status == 401) {
                    router.push("/");
                } else if (error.response.status == 404) {
                    setErrorMessage(
                        "There is an issue with the server. Please try again later"
                    );
                }
                setIsLoading(false);
                console.log(error);
            });
    }, []);
    const { TabPane } = Tabs;

    const handleChange = (value: number) => {
        setState({
            minValue: (value - 1) * 25,
            maxValue: value * 25,
        });
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-full flex-col flex items-center">
                    <span className="text-red-500 font-bold text-lg">
                        {errorMessage}
                    </span>
                    <span className="text-3xl font-bold mt-20 mb-16">
                        Your tickets at a glance
                    </span>
                    <div>You have a total of {requestData.length} tickets</div>
                    <div className="w-3/4 ">
                        {/* Dashboard for list of tickets */}
                        {/* TabPane allows splitting of the tickets into respective category */}
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Open Tickets" key="1">
                                <div className="flex pb-10 hide-scroll-bar">
                                    <div>
                                        {requestData.length > 0 &&
                                            requestData
                                                .filter((element) => {
                                                    if (
                                                        element.status != "open"
                                                    ) {
                                                        return false;
                                                    }
                                                    return true;
                                                })
                                                .slice(
                                                    state.minValue,
                                                    state.maxValue
                                                )
                                                .map((element) => {
                                                    console.log(element);
                                                    return (
                                                        <HomePageTicket
                                                            key={element.id}
                                                            id={element.id}
                                                            subject={
                                                                element.subject
                                                            }
                                                            requester={
                                                                element.requester_id
                                                            }
                                                            description={
                                                                element.description
                                                            }
                                                            status={
                                                                element.status
                                                            }
                                                            priority={
                                                                element.priority
                                                            }
                                                        />
                                                    );
                                                })}
                                        <div className="flex justify-center pt-5">
                                            <Pagination
                                                defaultCurrent={1}
                                                defaultPageSize={25} //default size of page
                                                onChange={handleChange}
                                                pageSizeOptions={[]}
                                                total={requestData.length} //total number of card data available
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Pending" key="2">
                                {requestData.length > 0 &&
                                    requestData
                                        .filter((element) => {
                                            if (element.status != "pending") {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .slice(state.minValue, state.maxValue)
                                        .map((element) => {
                                            console.log(element);
                                            return (
                                                <HomePageTicket
                                                    key={element.id}
                                                    id={element.id}
                                                    subject={element.subject}
                                                    requester={
                                                        element.requester
                                                    }
                                                    description={
                                                        element.description
                                                    }
                                                    status={element.status}
                                                    priority={element.priority}
                                                />
                                            );
                                        })}
                            </TabPane>
                            <TabPane tab="Solved" key="3">
                                {requestData.length > 0 &&
                                    requestData
                                        .filter((element) => {
                                            if (element.status != "solved") {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .slice(state.minValue, state.maxValue)
                                        .map((element) => {
                                            console.log(element);
                                            return (
                                                <HomePageTicket
                                                    key={element.id}
                                                    id={element.id}
                                                    subject={element.subject}
                                                    requester={
                                                        element.requester
                                                    }
                                                    description={
                                                        element.description
                                                    }
                                                    status={element.status}
                                                    priority={element.priority}
                                                />
                                            );
                                        })}
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
