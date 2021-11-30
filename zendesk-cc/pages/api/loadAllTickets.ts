import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

//This API helps the client to retrieve the full list of tickets under the user's id. Included a timeout for the request in the case that the endpoint fails
export default async function ZendeskAPI(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const zendeskSubDomain = "https://zccoversparkling.zendesk.com/";
    axios.defaults.timeout = 10000;
    await axios
        .get(
            zendeskSubDomain +
                "api/v2/users/" +
                req.body.userid +
                "/tickets/requested",
            {
                auth: {
                    username: req.body.username,
                    password: req.body.password,
                },
            }
        )
        .then((response1) => {
            console.log("hello");
            res.status(200).json(response1.data);
        })
        .catch((err) => {
            if (err.code == "ECONNABORTED") {
                res.status(404).json(err);
            } else if (err.response.status == 401) {
                res.status(401).json(err);
            }
        });
}
