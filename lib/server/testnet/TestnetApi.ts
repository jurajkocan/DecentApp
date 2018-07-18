import * as WebSocket from "ws";

export namespace ApiInterfaces {
    export interface GetAccounts {
        id: string;
        result: [string, string][];
    }

    export interface Account {}
}

export const testnetApi = () => {
    const test = async () => {
        const ws = new WebSocket("wss://stagesocket.decentgo.com:8090/", {
            rejectUnauthorized: false
        });

        ws.onopen = () => {
            ws.send(
                JSON.stringify({
                    id: 1,
                    method: "call",
                    params: [1, "login", ["", ""]]
                })
            );
            ws.send(
                JSON.stringify({
                    id: 2,
                    method: "call",
                    params: [1, "history", []]
                })
            );

            ws.send(
                JSON.stringify({
                    id: 3,
                    method: "call",
                    params: [
                        2,
                        "get_relative_account_history",
                        ["1.2.128", 1, 1, 8000]
                    ]
                })
            );
        };

        ws.onmessage = data => {
            console.log(data.data);
        };

        ws.onerror = err => {
            console.log(err);
        };
    };

    const openConnectionAndSendData = async (data: string) => {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket("wss://stagesocket.decentgo.com:8090/", {
                rejectUnauthorized: false
            });

            ws.onopen = () => {
                ws.send(data);
            };

            ws.onmessage = data => {
                resolve(data.data);
            };

            ws.onerror = err => {
                reject(err);
            };
        });
    };
    return {
        getAccounts: async (
            id: number,
            accountsLimit: number
        ): Promise<ApiInterfaces.GetAccounts> => {
            try {
                return JSON.parse((await openConnectionAndSendData(
                    JSON.stringify({
                        id: id,
                        method: "call",
                        params: [0, "lookup_accounts", ["", accountsLimit]]
                    })
                )) as string) as ApiInterfaces.GetAccounts;
            } catch (err) {
                throw err;
            }
        },

        getAccountHistory: async (accountId: string) => {
            try {
                return await test();
                // return await openConnectionAndSendData(
                //     JSON.stringify({
                //         id: 3,
                //         method: "call",
                //         params: [
                //             2,
                //             "get_relative_account_history",
                //             ["1.2.69", 1, 1, 8000]
                //         ]
                //     })
                // );
            } catch (err) {
                throw err;
            }
        }
    };
};
