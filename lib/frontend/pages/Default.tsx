import * as React from "react";
import { connect } from "react-redux";
import { AppState, UserAccountDetail } from "../redux/State";
import { GetUserAccountDetail } from "./DefaultPageAction";
import { AccountListGridComponent } from "../components/AccountListgrid/AccountListGrid";
import { AccountDetailComponent } from "../components/AccountDetail/AccountDetail";
import { style } from "typestyle";

const DefaultPageStyle = {
    Wrapper: style({
        display: "flex",
        height: "100vh"
    }),

    LeftSide: style({
        width: "30%"
    }),

    RightSide: style({
        width: "70%"
    })
};

interface OwnProps {}

interface DispatchToProps {
    setAccountDetail: typeof GetUserAccountDetail;
}

interface StateToProps {
    userAccountDetail: UserAccountDetail;
}

type Props = OwnProps & DispatchToProps & StateToProps;

export class DefaultPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className={DefaultPageStyle.Wrapper}>
                <div className={DefaultPageStyle.LeftSide}>
                    <AccountListGridComponent
                        setAccountDetail={this.props.setAccountDetail}
                    />
                </div>
                <div className={DefaultPageStyle.RightSide}>
                    <AccountDetailComponent
                        accountId={this.props.userAccountDetail.accountId}
                        name={this.props.userAccountDetail.accountName}
                        transactions={
                            this.props.userAccountDetail.transactionHistory
                        }
                    />
                </div>
            </div>
        );
    }
}

export const DefaultPageComponent = connect(
    (store: AppState) => {
        return store;
    },
    {
        setAccountDetail: GetUserAccountDetail
    }
)(DefaultPage);
