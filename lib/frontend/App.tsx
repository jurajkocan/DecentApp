import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { DefaultPageComponent } from "./pages/Default";

const appStore = createStore(() => {});

ReactDOM.render(
    <Provider store={appStore}>
        <DefaultPageComponent />
    </Provider>,
    document.getElementById("root") as HTMLDivElement
);
