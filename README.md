## How

Before install switch to node 16.9.1 (the same used in superset):

```bash
nvm use 16.9.1
```

## ISSUES

Errors executing `npm run storybook`, open terminal and type:

```sh
export NODE_OPTIONS=--openssl-legacy-provider
```

Thanks to [this issue](https://stackoverflow.com/a/69699772/357561)
