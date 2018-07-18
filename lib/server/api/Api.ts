import { Express } from "express";
import {
    getAccountHistory,
    getFilteredAccounts
} from "../account/AccountController";
import { testnetApi } from "../testnet/TestnetApi";

export const apiRoutes = async (app: Express) => {
    app.get("/account", async (req, res) => {
        const page = req.query.page;
        if (!page) {
            res.send("parameter page is required");
            return;
        }
        const pageSize = req.query.page_size as number;
        if (!pageSize) {
            res.send("parameter page_size is required");
            return;
        }
        const searchText = req.query.search_text;

        const accounts = await getFilteredAccounts(
            Number(page),
            Number(pageSize),
            searchText
        );
        res.send(accounts);
    });

    app.get("/account/history/:id", async (req, res) => {
        console.log("here");
        const account = await getAccountHistory(req.params.id);
        console.log(account);
        res.send(account);
    });
};
