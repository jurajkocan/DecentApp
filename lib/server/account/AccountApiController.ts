import { TestnetApi } from "../testnet/TestnetApi";
import Item from "antd/lib/list/Item";

export const getFilteredAccounts = async (
    page: number,
    pageSize: number,
    searchText: string
): Promise<
    {
        accountId: string;
        accountName: string;
    }[]
> => {
    try {
        const from = page * pageSize;
        const to = from + pageSize;

        const testnetApi = new TestnetApi();
        const allAccounts = await testnetApi.lookupAccounts(100);
        const textFiltered = allAccounts.result.filter((item, index) => {
            const [name, id] = item;
            if (searchText && searchText !== "") {
                return (
                    name.toLowerCase().includes(searchText.toLowerCase()) ||
                    id.toLowerCase().includes(searchText.toLowerCase())
                );
            }
            return true;
        });
        const sliced = textFiltered.slice(from, to);
        return sliced.map(item => {
            const [name, id] = item;
            return {
                accountId: id,
                accountName: name
            };
        });
    } catch (err) {
        throw err;
    }
};

export const getAccountHistory = async (
    accountId: string
): Promise<{ key: number; from: string; to: string; amount: string }[]> => {
    try {
        const testnetApi = new TestnetApi();
        const historyData = await testnetApi.getRelativeAccountHistory(
            accountId,
            undefined,
            100
        );
        if (historyData.result.length === 0) return [];
        return historyData.result.map((item, index) => {
            const [_, history] = item.op;
            return {
                key: index,
                from: history.from ? history.from : "-",
                to: history.to ? history.to : "-",
                amount: history.amount ? history.amount.amount.toString() : "-"
            };
        });
    } catch (err) {
        throw err;
    }
};
