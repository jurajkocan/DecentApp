import * as WebSocket from "ws";

export namespace ApiInterfaces {
    export interface LookupAccounts {
        id: string;
        result: [string, string][];
    }

    export interface History {
        id: string;
        result: number;
    }

    export interface RelativeAccountHistory {
        id: number;
        result: {
            id: string;
            op: [
                number,
                {
                    fee: { amount: number; asset_id: string };
                    from: string;
                    to: string;
                    amount: { amount: number; asset_id: string };
                    extensions: any[];
                }
            ];
            result: [number, {}];
            block_num: number;
            trx_in_block: number;
            op_in_trx: number;
            virtual_op: number;
        }[];
    }
}

//ideal scenario would be implement disposable class like in c# and than call it by 'using statement' but i am not going to do that for now
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
        this._callId = 1;
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

    private sendGetRelativeAccountHistory = async (
        accountId: string,
        paramId: number,
        minTransactionId: number,
        outputLimit: number,
        maxTransactionId: number
    ) => {
        try {
            if (this.isOpen) {
                return await this.sendData(
                    JSON.stringify({
                        id: 1,
                        method: "call",
                        params: [
                            paramId,
                            "get_relative_account_history",
                            [
                                accountId,
                                minTransactionId,
                                outputLimit,
                                maxTransactionId
                            ]
                        ]
                    })
                );
            } else {
                throw "connection is not open";
            }
        } catch (err) {
            throw err;
        }
    };

    private sendLookupAccounts = async (
        accountsLimit: number,
        paramId?: number
    ) => {
        paramId = paramId ? paramId : 0;
        try {
            if (this.isOpen) {
                return await this.sendData(
                    JSON.stringify({
                        id: this._callId,
                        method: "call",
                        params: [
                            paramId,
                            "lookup_accounts",
                            ["", accountsLimit]
                        ]
                    })
                );
            } else {
                throw "connection is not open";
            }
        } catch (err) {
            throw err;
        }
    };

    private sendHistory = async (paramId?: number) => {
        paramId = paramId ? paramId : 1;
        try {
            if (this.isOpen) {
                return await this.sendData(
                    JSON.stringify({
                        id: this._callId,
                        method: "call",
                        params: [paramId, "history", []]
                    })
                );
            } else {
                throw "connection is not open";
            }
        } catch (err) {
            throw err;
        }
    };

    private sendLogin = async (paramId?: number) => {
        paramId = paramId ? paramId : 1;
        try {
            if (this.isOpen) {
                return await this.sendData(
                    JSON.stringify({
                        id: this._callId,
                        method: "call",
                        params: [paramId, "login", ["", ""]]
                    })
                );
            } else {
                throw "connection is not open";
            }
        } catch (err) {
            throw err;
        }
    };

    // Public api access
    public lookupAccounts = async (accountsLimit: number) => {
        try {
            await this.openConnection();
            const data = await this.sendLookupAccounts(accountsLimit);
            await this.closeConnection();
            return JSON.parse(data) as ApiInterfaces.LookupAccounts;
        } catch (err) {
            throw err;
        }
    };

    public getRelativeAccountHistory = async (
        accountId: string,
        minTransactionId?: number,
        outputLimit?: number,
        maxTransactionId?: number
    ) => {
        minTransactionId = minTransactionId ? minTransactionId : 1;
        outputLimit = outputLimit ? outputLimit : 1;
        maxTransactionId = maxTransactionId ? maxTransactionId : 8000;

        await this.openConnection();
        const login = await this.sendLogin(1);

        let paramId: number;
        const databaseApi = await this.sendHistory(1);
        paramId = (JSON.parse(databaseApi) as ApiInterfaces.History).result;

        const data = await this.sendGetRelativeAccountHistory(
            accountId,
            paramId,
            minTransactionId,
            outputLimit,
            maxTransactionId
        );
        await this.closeConnection();

        return JSON.parse(data) as ApiInterfaces.RelativeAccountHistory;
    };
}
