export const getFilteredAccounts = (
    page: number,
    pageSize: number,
    searchText: string
) => {
    const res = [];
    for (let i = 0; i < pageSize; i++) {
        res.push(getAccountById(`id: ${i}`));
    }
    return res;
};

export const getAccountById = (accountId: string) => {
    return {
        accountId: accountId,
        accountName: "whatever",
        transactionHistory: [
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
        ]
    };
};
