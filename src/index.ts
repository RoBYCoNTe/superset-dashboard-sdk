import { Buffer } from "buffer";
import Dashboard from "./Dashboard/Dashboard";
import { DataProviderInterface } from "./DataProvider.types";
import DefaultDataProvider from "./DataProvider";

// https://github.com/apache/superset/issues/20800#issuecomment-1235269205
// Until superset team not fix this issue we need to use this workaround:
window.Buffer = Buffer;

export { Dashboard, DataProviderInterface, DefaultDataProvider };
