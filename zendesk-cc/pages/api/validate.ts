import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";


//This API helps the client to authenticate the user's login using their input credentials, returning 401 if their request are invalid 
export default async function ZendeskAPI(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const zendeskSubDomain = "https://zccoversparkling.zendesk.com/";
    let userId;
    await axios
        .get(zendeskSubDomain + "api/v2/users/me.json", {
            auth: {
                username: req.body.username,
                password: req.body.password,
            },
        })
        .then((response) => (userId = response.data.user.id));

    if (userId != null) {
        res.status(200).json({ id: userId });
    } else {
        res.status(401).json({ error: "Wrong credentials" });
    }
}
