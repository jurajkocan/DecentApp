import { UserAccountDetail } from "../redux/State";

export const GetUserAccountDetail = (userAccountDetail: UserAccountDetail) => {
    return {
        type: "GET_ACCOUNT_DETAIL",
        payload: userAccountDetail
    };
};
