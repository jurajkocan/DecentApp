export interface UserAccountDetail {
    accountName: string;
    accountId: string;
    transactionHistory: {
        from: string;
        to: string;
        amount: number;
    }[];
}

export interface AppState { 
    userAccountDetail: UserAccountDetail;
}

export const defaultState: AppState = {
    userAccountDetail: {
        accountId: "",
        accountName: "",
        transactionHistory: []
    }
};
