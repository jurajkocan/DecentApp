import * as WebSocket from "ws";
import { resolve } from "dns";
import { promises } from "fs";

export namespace ApiInterfaces {
    export interface GetAccounts {
        id: string;
        result: [string, string][];
    }

    export interface Account {}
}

//ideal scenario would be implement disposable class like in c# and than call it by using statement but i am not going to do that for now
//using(new class) {
//    anything
//}
//using statement would call this.dispose()

export class TestnetApi {
    private _ws: WebSocket;
    private _apiUrl: string = "wss://stagesocket.decentgo.com:8090/";
    private _callId: number;
    private _tryCount: number;
    constructor() {
        this._callId = 0;
        this._tryCount = 0;
    }

    private get isOpen() {
        return this._ws.readyState === 1;
    }

    private openConnection = async () => {
        return new Promise(async (resolve, reject) => {
            this._ws = new WebSocket(this._apiUrl, {
                rejectUnauthorized: false
            });

            this._ws.onopen = () => {
                resolve(true);
            };

            this._ws.onerror = async err => {
                if (this._tryCount === 0) {
                    this._tryCount += 1;
                    try {
                        const connection = await this.openConnection();
                        resolve(connection);
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    this._tryCount = 0;
                }
                reject(err);
            };
        });
    };

    private closeConnection = async () => {
        return new Promise((resolve, reject) => {
            this._ws.close();
            this._ws.onclose = () => {
                resolve(true);
            };

            this._ws.onerror = err => {
                reject(err);
            };
        });
    };

    private sendData = async (data: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (this.isOpen) {
                this._ws.send(data);
                this._ws.onmessage = data => {
                    resolve(data.data);
                };

                this._ws.onerror = err => {
                    reject(err);
                };
            } else {
                reject("connection is not open");
            }
        });
    };

    // Public api access
    public lookupAccounts = async (accountsLimit: number) => {
        try {
            await this.openConnection();
            const data = await this.sendData(
                JSON.stringify({
                    id: this._callId,
                    method: "call",
                    params: [0, "lookup_accounts", ["", accountsLimit]]
                })
            );

            await this.closeConnection();
            return JSON.parse(data) as ApiInterfaces.GetAccounts;
        } catch (err) {
            throw err;
        }
    };
}

export const testnetApi = () => {
    const test = async (id: number) => {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket("wss://stagesocket.decentgo.com:8090/", {
                rejectUnauthorized: false
            });

            ws.onopen = () => {
                if (id === 0) {
                    ws.send(
                        JSON.stringify({
                            id: 1,
                            method: "call",
                            params: [1, "login", ["", ""]]
                        })
                    );
                }
                if (id === 1) {
                    ws.send(
                        JSON.stringify({
                            id: 2,
                            method: "call",
                            params: [1, "history", []]
                        })
                    );
                }
                if (id === 2) {
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
                }
            };

            ws.onmessage = data => {
                resolve(data);
                ws.close();
            };

            ws.onerror = err => {
                console.log("err:", err);
            };
        });
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
                console.log("test0: ", await test(0));
                console.log("test1: ", await test(1));
                console.log("test2: ", await test(2));
                return await test(2);
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
