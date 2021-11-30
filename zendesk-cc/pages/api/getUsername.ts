import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";


//This API helps the client to translate the userID from tickets to username/name for better user experience on the client
export default async function ZendeskAPI(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const zendeskSubDomain = "https://zccoversparkling.zendesk.com/";
    await axios
        .get(zendeskSubDomain + "api/v2/users/" + req.body.userid, {
            auth: {
                username: req.body.username,
                password: req.body.password,
            },
        })
        .then((response1) => res.status(200).json(response1.data))
        .catch((err) => {
            console.log(err);
            res.status(401).json(err);
        });
}
