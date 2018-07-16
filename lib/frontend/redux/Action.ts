import { UserAccountDetail } from "./State";

export type GET_ACCOUNT_DETAIL = "GET_ACCOUNT_DETAIL";

export type GetAccountDetail = {
    type: GET_ACCOUNT_DETAIL;
    payload: UserAccountDetail;
};

export type Actions = GetAccountDetail;
