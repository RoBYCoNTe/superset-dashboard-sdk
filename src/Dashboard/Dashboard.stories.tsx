import Dashboard from "./Dashboard";
import DataProvider from "../DataProvider";
import React from "react";

const localDataProvider = new DataProvider("http://localhost:8088", {
  username: "robyconte",
  password: "ciccio",
});

export default {
  title: "Dashboard",
};

export const Scrollable = () => (
  <Dashboard
    id="4c2374d1-6371-4793-859c-d834a5cae7d5"
    domain="http://localhost:8088"
    dataProvider={localDataProvider}
  />
);
export const FullHeight = () => (
  <Dashboard
    id="4c2374d1-6371-4793-859c-d834a5cae7d5"
    fullheight
    domain="http://localhost:8088"
    dataProvider={localDataProvider}
  />
);
