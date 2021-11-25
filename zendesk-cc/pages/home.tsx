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

const Dashboard: NextPage = () => {
    const [requestData, setRequestData] = useState<any[]>([]);
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 25,
    });
    useEffect(() => {
        axios
            .post("/api/loadAllTickets", {
                username: Cookies.get("username"),
                password: Cookies.get("password"),
                userid: Cookies.get("user_id"),
            })
            .then((response) => {
                console.log(response.data);
                setRequestData(response.data.tickets);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const { TabPane } = Tabs;

    const handleChange = (value:number) => {
        setState({
            minValue: (value - 1) * 25,
            maxValue: value * 25,
        });
    };

    return (
        // <div className="w-full flex-col flex items-center justify-center">
        //     {requestData.length > 0 &&
        //         requestData.map((element) => {
        //             console.log(element);
        //             return (
        //                 <HomePageTicket
        //                     subject={element.subject}
        //                     requester={element.requester}
        //                     description={element.description}
        //                     status={element.status}
        //                     priority={element.priority}
        //                 />
        //             );
        //         })}
        // </div>
        <div className="w-full flex-col flex items-center">
            <span className="text-3xl font-bold mt-20 mb-16">
                Your tickets at a glance
            </span>
            <div>
              You have a total of {requestData.length} tickets and 25 on this page
            </div>
            <div className="w-3/4 ">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Open Tickets" key="1">
                        <div className="flex pb-10 hide-scroll-bar">
                            <div>
                                {requestData.length > 0 &&
                                    requestData
                                        .filter((element) => {
                                            if (element.status != "open") {
                                                return false;
                                            }
                                            return true;
                                        })
                                        .slice(state.minValue, state.maxValue)
                                        .map((element) => {
                                            console.log(element);
                                            return (
                                                <HomePageTicket
                                                    id={element.id}
                                                    subject={element.subject}
                                                    requester={
                                                        element.requester_id
                                                    }
                                                    description={
                                                        element.description
                                                    }
                                                    status={element.status}
                                                    priority={element.priority}
                                                />
                                            );
                                        })}
                                <div className="flex justify-center pt-5">
                                    <Pagination
                                        defaultCurrent={1}
                                        defaultPageSize={25} //default size of page
                                        onChange={handleChange}
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
                                            id={element.id}
                                            subject={element.subject}
                                            requester={element.requester}
                                            description={element.description}
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
                                            id={element.id}
                                            subject={element.subject}
                                            requester={element.requester}
                                            description={element.description}
                                            status={element.status}
                                            priority={element.priority}
                                        />
                                    );
                                })}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Dashboard;
