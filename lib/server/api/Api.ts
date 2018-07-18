import { Express } from "express";
import {
    getAccountHistory,
    getFilteredAccounts
} from "../account/AccountApiController";

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

        try {
            const accounts = await getFilteredAccounts(
                Number(page),
                Number(pageSize),
                searchText
            );
            res.send(accounts);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get("/account/history/:id", async (req, res) => {
        try {
            const account = await getAccountHistory(req.params.id);
            res.send(account);
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
