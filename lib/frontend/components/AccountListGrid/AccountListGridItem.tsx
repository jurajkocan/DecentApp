import * as React from "react";
import { Card } from "antd";
import { style } from "typestyle";

const CardStyle = {
    CardStyle: style({
        marginLeft: 2,
        marginRight: 2,
        marginTop: 4,
        marginBottom: 4
    }),
    ActiveStyle: style({
        boxShadow: "0 1px 10px rgba(0,195,0,0.38)"
    }),
    HeaderStyle: style({
        fontSize: 15,
        fontWeight: "bold"
    })
};

interface AccountListGridProps {
    id: string;
    name: string;
    isActive: boolean;
    onClick: (id: string) => any;
}

export const AccountListGridItemComponent = (props: AccountListGridProps) => {
    const onClick = () => {
        props.onClick(props.id);
    };

    return (
        <div
            className={
                (props.isActive ? CardStyle.ActiveStyle : "") +
                " " +
                CardStyle.CardStyle
            }
        >
            <Card onClick={onClick} hoverable={true}>
                <Card.Grid
                    style={{
                        width: "100%"
                    }}
                >
                    <div className={CardStyle.HeaderStyle}> {props.name}</div>
                    <div>AccountId: {props.id}</div>
                </Card.Grid>
            </Card>
        </div>
    );
};
