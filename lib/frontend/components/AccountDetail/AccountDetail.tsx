import * as React from "react";
import {} from "antd";
import { TransactionHistoryComponent } from "../TransactionHistory/TransactionHistory";
import { style } from "typestyle";
import { UserAccountDetail } from "../../redux/State";

const AccountDetailStyle = {
    AccountDetailStyle: style({
        margin: 50
    }),
    HeaderStyle: style({
        fontWeight: "bold",
        fontSize: 50
    })
};

interface AccountDetailProps {
    name: string;
    accountId: string;
    transactions: UserAccountDetail["transactionHistory"];
}

export const AccountDetailComponent = (props: AccountDetailProps) => {
    return (
        <div className={AccountDetailStyle.AccountDetailStyle}>
            <div className={AccountDetailStyle.HeaderStyle}>
                {props.name} ({props.accountId})
            </div>
            <div>Transaction history</div>
            <div>
                <TransactionHistoryComponent
                    transactions={props.transactions}
                />
            </div>
        </div>
    );
};
