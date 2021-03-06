import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import { AccountListGridItemComponent } from "./AccountListGridItem";
import axios from "axios";
import { Input } from "antd";
import { GetUserAccountDetail } from "../../pages/DefaultPageAction";
import { UserAccountDetail } from "../../redux/State";
import { style } from "typestyle";
import { message } from "antd";
import { LoaderComponent } from "../Loader/Loader";

const Search = Input.Search;

const AccountListGridStyle = {
    ScrollBarWrapper: style({
        overflowY: "auto",
        height: "calc(100% - 36px)"
    })
};

interface AccountListGridProps {
    setAccountDetail: typeof GetUserAccountDetail;
}

interface AccountListGridState {
    isAccountDetailLoading: boolean;
    hasMoreItems: boolean;
    page: number;
    pageSize: number;
    searchText: string;
    gridItems: gridItem[];
    isNewSearch: boolean;
    showLoading: boolean;
    activeId: string;
}

type gridItem = {
    accountName: string;
    accountId: string;
};

export class AccountListGridComponent extends React.Component<
    AccountListGridProps,
    AccountListGridState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            isAccountDetailLoading: false,
            hasMoreItems: true,
            page: 0,
            pageSize: 10,
            searchText: "",
            gridItems: [],
            isNewSearch: true,
            showLoading: false,
            activeId: ""
        };
    }

    onItemClick = async (id: string, name: string) => {
        this.setState({ isAccountDetailLoading: true });
        try {
            const response = await axios.get(`/account/history/${id}`);
            if (response.status === 200) {
                const accountHistory = response.data as UserAccountDetail["transactionHistory"];
                const accountDetail: UserAccountDetail = {
                    accountId: id,
                    accountName: name,
                    transactionHistory: accountHistory
                };

                this.props.setAccountDetail(accountDetail);
                this.setState({ activeId: id });
            } else {
                message.error("Something is wrong, try again later");
            }
            this.setState({ isAccountDetailLoading: false });
        } catch (err) {
            message.error("Something is wrong, try again later");
            this.setState({ isAccountDetailLoading: false });
        }
    };

    searchAccounts = (searchText: string) => {
        this.setState(
            {
                page: 0,
                pageSize: 10,
                searchText: searchText,
                isNewSearch: true,
                gridItems: [],
                showLoading: true
            },
            this.loadMore
        );
    };

    getGridItems = async (
        page: number,
        pageSize: number,
        searchText: string
    ) => {
        try {
            const response = await axios.get(
                `/account?page=${page}&page_size=${pageSize}&search_text=${searchText}`
            );
            if (response.status === 200) return response.data as gridItem[];
            else {
                message.error("Somthing is wrong, try again later");
                return [];
            }
        } catch (err) {
            message.error("Something is wrong, try again later");
            return [];
        }
    };

    loadMore = async () => {
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        const searchText = this.state.searchText;
        let gridItems: gridItem[];
        try {
            gridItems = await this.getGridItems(page, pageSize, searchText);
            if (gridItems.length === 0) {
                message.info("No more items");
            }
        } catch (err) {
            message.error("Something is wrong, try again later");
            gridItems = [];
        }
        this.setState({
            gridItems: this.state.isNewSearch
                ? gridItems
                : this.state.gridItems.concat(gridItems),
            hasMoreItems: gridItems.length === pageSize,
            isNewSearch: false,
            page: page + 1,
            pageSize: pageSize,
            showLoading: false
        });
    };

    render() {
        return (
            <div style={{ height: "100%" }}>
                <div>
                    <Search
                        placeholder="Search accounts"
                        onSearch={this.searchAccounts}
                        size="large"
                    />
                </div>
                <div className={AccountListGridStyle.ScrollBarWrapper}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        loader={<LoaderComponent />}
                        useWindow={false}
                    >
                        {this.state.gridItems.map((item, index) => {
                            return (
                                <div
                                    style={{
                                        cursor: this.state
                                            .isAccountDetailLoading
                                            ? "wait"
                                            : "pointer"
                                    }}
                                >
                                    <AccountListGridItemComponent
                                        key={index}
                                        id={item.accountId}
                                        name={item.accountName}
                                        onClick={
                                            this.state.isAccountDetailLoading
                                                ? undefined
                                                : this.onItemClick
                                        }
                                        isActive={
                                            this.state.activeId ===
                                            item.accountId
                                                ? true
                                                : false
                                        }
                                    />
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
