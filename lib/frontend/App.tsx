import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, Reducer } from "redux";

import { DefaultPageComponent } from "./pages/Default";
import { reducer } from "./redux/Reducer";
import { AppState, defaultState } from "./redux/State";

const appStore = createStore(reducer as Reducer<AppState>, defaultState);

ReactDOM.render(
    <Provider store={appStore}>
        <DefaultPageComponent />
    </Provider>,
    document.getElementById("root") as HTMLDivElement
);
