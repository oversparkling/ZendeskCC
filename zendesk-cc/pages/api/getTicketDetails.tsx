import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

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
            console.log(err.response)
            if (err.response.status == 404){
                res.status(404).json(err);
            }
            else{
                res.status(401).json(err);
            }
            // console.log(err);
        });
}
