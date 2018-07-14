import * as WebSocket from "ws";
import { startSever } from "./server/Server";

const main = async () => {
    console.log("start server");
    startSever();

    //   const ws = new WebSocket("wss://stage.decentgo.com:8090");
    //   ws.on("open", function open() {
    //     console.log("ws open");
    //   });

    //   ws.onmessage = function(event) {
    //     console.log(event.data);
    //   };

    //   ws.onerror = event => {
    //     console.log(event);
    //   };

    //   ws.send("some message");

    // ws.send("some data");
};

main();
