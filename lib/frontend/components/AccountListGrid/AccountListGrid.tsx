import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import { AccountListGridItemComponent } from "./AccountListGridItem";
import axios from "axios";
import { Input } from "antd";
import { GetUserAccountDetail } from "../../pages/DefaultPageAction";
import { UserAccountDetail } from "../../redux/State";

const Search = Input.Search;
interface AccountListGridProps {
    setAccountDetail: typeof GetUserAccountDetail;
}

interface AccountListGridState {
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

    onItemClick = async (id: string) => {
        try {
            const response = await axios.get(`/account/${id}`);
            if (response.status === 200) {
                const accountDetail = response.data as UserAccountDetail;
                this.props.setAccountDetail(accountDetail);
                this.setState({ activeId: id });
            } else {
                console.log("todo: handle error");
            }
        } catch (err) {
            throw err;
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
                `/account?page=${page}}&page_size=${pageSize}&search_text=${searchText}`
            );
            if (response.status === 200) return response.data as gridItem[];
            else throw response.data;
        } catch (err) {
            throw err;
        }
    };

    loadMore = async () => {
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        const searchText = this.state.searchText;
        let gridItems: gridItem[];
        try {
            gridItems = await this.getGridItems(page, pageSize, "some text");
        } catch (err) {
            // TODO: add some message aabout error
            gridItems = [];
        }
        this.setState({
            gridItems: this.state.isNewSearch
                ? gridItems
                : this.state.gridItems.concat(gridItems),
            hasMoreItems: gridItems.length === pageSize,
            isNewSearch: false,
            page: page + 1,
            pageSize: pageSize + pageSize,
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
                <div style={{ overflowY: "auto", height: "calc(100% - 36px" }}>
                    {this.state.showLoading ? <div>Some loader here</div> : ""}
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        loader={<div> loader here </div>}
                        useWindow={false}
                    >
                        {/* {this.renderRows()} */}
                        {this.state.gridItems.map((item, index) => {
                            return (
                                <div style={{ cursor: "pointer" }}>
                                    <AccountListGridItemComponent
                                        key={index}
                                        id={item.accountId}
                                        name={item.accountName}
                                        onClick={this.onItemClick}
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
