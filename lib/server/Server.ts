import * as WebSocket from "ws";
import * as axios from "axios";
import * as Express from "express";
import * as BodyParser from "body-parser";
import { renderHtml } from "../frontend/RenderHtml";
import { apiRoutes } from "./api/Api";

export const startSever = async () => {
    const app = Express();
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json({ limit: "50mb" }));
    app.use(Express.static("./public"));

    apiRoutes(app);

    app.get("*", async (req, res) => {
        res.send(renderHtml);
    });

    app.listen(3000);
    console.log("server started");
};
