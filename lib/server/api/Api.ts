import { Express } from "express";
import {
    getAccountById,
    getFilteredAccounts
} from "../account/AccountController";

export const apiRoutes = async (app: Express) => {
    app.get("/account", async (req, res) => {
        const page = req.query.page;
        if (!page) {
            res.send("parameter page is required");
            return;
        }
        const pageSize = req.query.page_size;
        if (!pageSize) {
            res.send("parameter page_size is required");
            return;
        }
        const searchText = req.query.search_text;
        if (!searchText) {
            res.send("parameter search_text is required");
            return;
        }

        const accounts = getFilteredAccounts(page, pageSize, searchText);
        res.send(accounts);
    });

    app.get("/account/:id", async (req, res) => {
        const account = getAccountById(req.params.id);
        res.send(account);
    });
};
