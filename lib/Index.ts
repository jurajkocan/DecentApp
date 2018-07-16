// import * as WebSocket from "ws";
import { startSever } from "./server/Server";

const main = async () => {
    console.log("start server");
    startSever();
};

main();
