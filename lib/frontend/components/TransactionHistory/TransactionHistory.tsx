import * as React from "react";
import { Table, Icon, Divider } from "antd";
import { UserAccountDetail } from "../../redux/State";

interface transactionHistoryProps {
    transactions: UserAccountDetail["transactionHistory"];
}

const columns = [
    {
        title: "From",
        dataIndex: "from",
        key: "from"
    },
    {
        title: "To",
        dataIndex: "to",
        key: "to"
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount"
    }
];

export const TransactionHistoryComponent = (props: transactionHistoryProps) => {
    return (
        <div>
            <Table  columns={columns} dataSource={props.transactions} />
        </div>
    );
};
