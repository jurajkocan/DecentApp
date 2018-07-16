import * as React from "react";
import { connect } from "react-redux";
import { AppState, UserAccountDetail } from "../redux/State";
import { GetUserAccountDetail } from "./DefaultPageAction";
import { AccountListGridComponent } from "../components/AccountListgrid/AccountListGrid";
import { AccountDetailComponent } from "../components/AccountDetail/AccountDetail";

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
            <div style={{ display: "flex", height: "100vh" }}>
                <div
                    style={{
                        width: "30%"
                    }}
                >
                    <AccountListGridComponent
                        setAccountDetail={this.props.setAccountDetail}
                    />
                </div>
                <div
                    style={{
                        width: "70%"
                    }}
                >
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
