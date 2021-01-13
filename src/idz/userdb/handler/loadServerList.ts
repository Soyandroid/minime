import { LoadServerListRequest } from "../request/loadServerList";
import { LoadServerListResponse } from "../response/loadServerList";
import { Repositories } from "../repo";
import { HOST_EXT, PORT_IDZ } from "../../../switchboard";

export function loadServerList(
  w: Repositories,
  req: LoadServerListRequest
): LoadServerListResponse {
  return {
    type: "load_server_list_res",
    status: 1,
    userDb: {
      addr: HOST_EXT,
      tcp: PORT_IDZ.USERDB.TCP,
      http: 10001,
    },
    matchAddr: HOST_EXT,
    matchPort: {
      tcp: PORT_IDZ.MATCH.TCP,
      udpSend: PORT_IDZ.MATCH.UDP_SEND,
      udpRecv: PORT_IDZ.MATCH.UDP_RECV,
    },
    tagMatchPort: {
      tcp: 10005,
      udpSend: 10006,
      udpRecv: 10007,
    },
    event: {
      addr: HOST_EXT,
      tcp: 10008,
    },
    screenshot: {
      addr: HOST_EXT,
      tcp: 10009,
    },
    pingReturn: HOST_EXT,
    echo1: {
      addr: HOST_EXT,
      udp: 10010,
    },
    echo2: {
      addr: HOST_EXT,
      udp: 10011,
    },
    newsUrl: `http://${HOST_EXT}:10012/news/news80**.txt`,
    reportErrorUrl: `http://${HOST_EXT}:10013/error`,
  };
}
