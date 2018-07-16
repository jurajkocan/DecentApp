import * as WebSocket from "ws";
import * as axios from "axios";
import * as Express from "express";
import * as BodyParser from "body-parser";
import { renderHtml } from "../frontend/RenderHtml";
import { apiRoutes } from "./api/Api";
import { getTypeStyle } from "../frontend/styles/TypeStyle";

export const startSever = async () => {
    const app = Express();
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json({ limit: "50mb" }));
    app.use(Express.static("./public"));

    app.get("/test", async (req, res) => {
        console.log("here");
        try {
            const ws = await new WebSocket("ws://stage.decentgo.com:8090/");
            console.log(ws.readyState);
            ws.onclose = function(event) {
                console.log("ocnclose");
            };

            ws.onopen = function(event) {
                console.log("open");
                //ws.send("Here's some text that the server is urgently awaiting!");
            };

            ws.onmessage = function(event) {
                console.log(event.data);
            };

            ws.onerror = event => {
                console.log("onerror: ", event);
            };

            ws.send("some message");

            ws.send("some data");
        } catch (err) {
            console.log(err);
        }
    });

    apiRoutes(app);

    app.get("*", async (req, res) => {
        res.send(renderHtml);
    });

    app.listen(3000);
    console.log("server started");
};
