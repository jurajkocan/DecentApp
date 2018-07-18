import * as React from "react";
import { style, keyframes } from "typestyle";

export const loaderAnimation = keyframes({
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
});

export const loader = style({
    margin: "auto",
    border: "8px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "8px solid #3498db",
    width: "60px",
    height: "60px",
    animation: "spin 2s linear infinite",
    animationName: loaderAnimation,
    padding: "10px"
});

export const LoaderComponent = () => {
    return <div className={loader} />;
};
