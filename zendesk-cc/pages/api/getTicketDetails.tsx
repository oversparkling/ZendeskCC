import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

//This API helps to our client to retrieve the ticket details given the ticket ID and their credentials
export default async function ZendeskAPI(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const zendeskSubDomain = "https://zccoversparkling.zendesk.com/";
    await axios
        .get(zendeskSubDomain + "api/v2/tickets/" + req.body.ticketId, {
            auth: {
                username: req.body.username,
                password: req.body.password,
            },
        })
        .then((response1) => res.status(200).json(response1.data))
        .catch((err) => {
            res.status(err.response.status).json(err);
        });
}
