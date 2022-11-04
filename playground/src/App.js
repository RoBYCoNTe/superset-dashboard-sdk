import { Dashboard, DefaultDataProvider } from "superset-dashboard";

const localDataProvider = new DefaultDataProvider("http://localhost:8088", {
  username: "robyconte",
  password: "ciccio",
});

function App() {
  return (
    <Dashboard
      id="4c2374d1-6371-4793-859c-d834a5cae7d5"
      domain="http://localhost:8088"
      dataProvider={localDataProvider}
      fullheight
    />
  );
}

export default App;
