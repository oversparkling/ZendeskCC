import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function ZendeskAPI(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const zendeskSubDomain = "https://zccoversparkling.zendesk.com/";
    let userId
    await axios
    .get(zendeskSubDomain + "api/v2/users/me.json", {
      auth: {
        username: req.body.username,
        password: req.body.password,
      },
    })
    .then((response) => userId = response.data.user.id)
    // .catch((err) => {
    //   res.status(401).json({ error: "Wrong credentials" });
    //   return
    // });
    if (userId!= null){
      res.status(200).json({ id: userId })
    }
    else{
      res.status(401).json({ error: "Wrong credentials" })
    }
    // res.status(200).json({ id: userId })
}