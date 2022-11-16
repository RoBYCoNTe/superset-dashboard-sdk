# Superset Dashboard

Superset Dashboard is a library to help you publish your
dashboards outside of the Superset application. This plugin does not use the
Superset default [@superset-ui/embedded-sdk](https://www.npmjs.com/package/@superset-ui/embedded-sdk) but my own implementation written starting from the base plugin.

## Installation

```bash
npm i -S superset-dashboard
```

## Usage

Superset Dashboard provide a basic `Dashboard` component that you can use to
render a dashboard and a `DefaultDataProvider` that follows Superset API
standards to retrieve and provide a valid guest token. In addition to that,
you can create your own `DataProvider` implementing `DataProviderInterface`.

The `DataProviderInterface`requires you to implement the following methods:

- `fetchGuestToken`: to retrieve a valid guest token and return a `Promise`
  with the token string value.

### Create a Dashboard

To publish a dashboard, you need to create a `Dashboard` component and pass
required props (described below) to it.

```tsx
// MyDashboard.tsx

import { Dashboard, DefaultDataProvider } from "superset-dashboard";

const dataProvider = new DataProvider("http://localhost:8088", {
  username: "<guest account>",
  password: "<guest password>",
});

const MyDashboard = () => {
  return (
    <Dashboard
      dataProvider={dataProvider}
      domain="http://localhost:8088"
      id={1}
    />
  );
};
```

The `Dashboard` component requires the following props:

- `dataProvider`: an instance of class implementing `DataProviderInterface`
  to retrieve data from Superset.
- `domain`: the domain where Superset is running.
- `id`: the id of the dashboard to render.
- `fullheight`: if true, the dashboard will take the full height of the
  container. Default: `false`.

**Notes**: to retrieve more informations about how to configure superset
please refer to the my blog post [here](https://robertoconterosito.it/2022/11/publish-superset-dashboards-inside-nextjs-app/).

# Contributing

**Before install switch to node 16.9.1 (the same used in superset):**

```bash
nvm use
```

To build the library:

```bash
npm run build
```

To run the tests:

```bash
npm run test
```

To run playground tests:

```bash
cd playground
npm start
```

To use storybook:

```bash
npm run storybook
```

_For every command add :watch to run in watch mode._
