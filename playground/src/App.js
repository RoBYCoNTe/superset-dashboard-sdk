import {
  Dashboard,
  createDefaultNativeFilter,
  createDefaultNativeFilterGroup,
} from "superset-dashboard";
import { SUPERSET_DOMAIN, dataProvider } from "./config";
import { useEffect, useState } from "react";

const RESOURCE_ID = "bcf5ca3d-1a68-4613-b585-2b4f265b61a0";
function App() {
  const [guestToken, setGuestToken] = useState(null);
  useEffect(() => {
    async function fetch() {
      const guestToken = await dataProvider.fetchGuestToken([
        { id: RESOURCE_ID, type: "dashboard" },
      ]);
      setGuestToken(guestToken);
      const dashboard = await dataProvider.fetchDashboardInfo(guestToken, 1);
      const jsonMetadata = dashboard.getJsonMetadata();
      const nativeFilter = jsonMetadata.native_filter_configuration[0];
      const targetColumn = nativeFilter.targets[0];
      const nativeFilterData = await dataProvider.fetchChartData(guestToken, {
        datasource: {
          id: targetColumn.datasetId,
          type: "table",
        },
        queries: [
          {
            columns: [targetColumn.column.name],
            orderby: [[targetColumn.column.name, false]],
            groupby: [targetColumn.column.name],
          },
        ],
      });
      console.info({
        nativeFilter,
        nativeFilterData,
      });
    }
    fetch();
  }, []);

  if (!guestToken) {
    return null;
  }

  return (
    <Dashboard
      id={RESOURCE_ID}
      domain={SUPERSET_DOMAIN}
      dataProvider={dataProvider}
      fullheight
      guestToken={guestToken}
      uiConfig={{
        hideTitle: true,
        filters: {
          native_filters: createDefaultNativeFilterGroup([
            createDefaultNativeFilter(
              "NATIVE_FILTER-37AnUlqIo",
              "pathology",
              "IN",
              "CHE"
            ),
            createDefaultNativeFilter(
              "NATIVE_FILTER-GAeFWY3OB",
              "risk",
              "IN",
              "Tutte"
            ),
          ]),
        },
      }}
    />
  );
}

export default App;
