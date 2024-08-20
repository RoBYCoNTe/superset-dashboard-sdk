import Dashboard from "./Dashboard/Dashboard";
import { UiConfigType } from "./Dashboard/Embedded";
import DataProvider from "./DataProvider";
import React from "react";
import ReactDOM from "react-dom";

function render(
  elementId: string,
  endpoint: string,
  username: string,
  password: string,
  uuid: string,
  placeholder?: string | boolean,
  autosize: boolean = false,
  uiConfig?: UiConfigType
) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }
  const dataProvider = new DataProvider(endpoint, { username, password });

  ReactDOM.render(
    <React.StrictMode>
      <Dashboard
        placeholder={placeholder}
        autosize={autosize}
        domain={endpoint}
        dataProvider={dataProvider}
        uuid={uuid}
        uiConfig={uiConfig}
      />
    </React.StrictMode>,
    document.getElementById(elementId)
  );
}

export default render;
