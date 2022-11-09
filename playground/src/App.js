import { SUPERSET_DOMAIN, dataProvider } from "./config";

import { Dashboard } from "superset-dashboard";

function App() {
  return (
    <div style={{ marginTop: 100, marginBottom: 100 }}>
      <Dashboard
        id="3166c187-bd00-4ec3-8687-d11c755d3d64"
        domain={SUPERSET_DOMAIN}
        dataProvider={dataProvider}
        fullheight
      />
    </div>
  );
}

export default App;
