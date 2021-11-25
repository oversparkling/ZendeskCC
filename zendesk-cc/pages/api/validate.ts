import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function ZendeskAPI(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const zendeskSubDomain = "https://zccoversparkling.zendesk.com/";
  const response = await axios
    .get(zendeskSubDomain + "api/v2/users/me.json", {
      auth: {
        username: req.body.username,
        password: req.body.password,
      },
    })
    .then((response) => res.status(200).json({ id: response.data.user.id }))
    .catch((err) => {
      res.status(401).json({ error: "Wrong credentials" });
    });
}