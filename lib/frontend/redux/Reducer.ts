import { AppState } from "./State";
import { Actions } from "./Action";

export const reducer = (state: AppState, action: Actions): AppState => {
    switch (action.type) {
        case "GET_ACCOUNT_DETAIL":
            return {
                userAccountDetail: action.payload
            };
        default:
            return state;
    }

    return state;
};
