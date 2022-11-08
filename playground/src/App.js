import { Dashboard, DefaultDataProvider } from "superset-dashboard";

const localDataProvider = new DefaultDataProvider("http://localhost:8088", {
  username: "guest",
  password: "guest",
});

function App() {
  return (
    <div>
      <Dashboard
        id="9b19ba41-0287-4f29-aaa9-a554addf16e6"
        domain="http://localhost:8088"
        dataProvider={localDataProvider}
        fullheight
      />
    </div>
  );
}

export default App;
