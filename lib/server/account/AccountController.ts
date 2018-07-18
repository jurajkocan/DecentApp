import { testnetApi, TestnetApi } from "../testnet/TestnetApi";
import Item from "../../../node_modules/antd/lib/list/Item";

export const getFilteredAccounts = async (
    page: number,
    pageSize: number,
    searchText: string
) => {
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
        console.log(err);
        //TODO: handle error
    }
};

export const getAccountHistory = async (accountId: string) => {
    const a = await testnetApi().getAccountHistory("");

    return;
    [
        {
            from: "1",
            to: "1",
            amount: 11
        },
        {
            from: "2",
            to: "2",
            amount: 22
        },
        {
            from: "3",
            to: "3",
            amount: 33
        },
        {
            from: "4",
            to: "4",
            amount: 44
        }
    ];
};
