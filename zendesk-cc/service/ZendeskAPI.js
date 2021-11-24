import axios from "axios";

const zendeskSubDomain = "https://zccoversparkling.zendesk.com/";

class ZendeskAPI {
  validateUser = async (username, password) => {
    const res = await axios.get(zendeskSubDomain + "api/v2/groups.json", {
      auth: {
        username: username,
        password: password,
      },
    });
    return res.status;
  };
}

export default new ZendeskAPI();
