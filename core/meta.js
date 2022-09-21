import {getScrollbarWidth } from "./utils/util";

export const cellStyle = {
    width: 100,
    height: 30,
}

export const width = 1000;
export const height = 500;

export const strokeColor = '#dee0e3';

export const containerPadding = 12;

export const getTableViewWidth = () => width - containerPadding * 2 - getScrollbarWidth();

export const getTableViewHeight = () => height - containerPadding * 2 - getScrollbarWidth();
