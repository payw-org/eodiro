# eodiro ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/paywteam/eodiro?include_prereleases)

The futuristically next major version of **eodiro.com** using React and Next.

## Documentation

- [Changelog](docs/Changelog.md)
- [Design Guidelines](docs/wiki/Design-Guidelines.md)
- [UI Components](docs/wiki/UI-Components.md)
- [ToDo](docs/ToDo.md)

## Development

### Using dev API locally

You must clone and run [`eodiro-api2`](https://github.com/paywteam/eodiro-api2) on your local machine in dev mode.

```zsh
npm run dev
```

### Using server API (https://eodiro.com)

Also you can develop only the client application without cloning server repository `eodiro-api2`.

```zsh
npm run dev --useProdApi
```

> Recent client application in the master branch may not match to the API distributed on https://eodiro.com. To develop using the recent APIs, download and run API repository locally.

### Using dev API (localhost)

By default, `npm run dev` connects to local dev API server and `npm start` tries to connect to the real server(https://eodiro.com). However, sometimes you need to test the production-ready, built version of client application with the dev API. To achieve this, simply pass an argument similar to the one above

```zsh
npm start --useDevApi
```

> `--useProdApi` and `--useDevApi` are only for the purpose of tests. Do not use them in production. For more information about API hosts, checkout the [source code](https://github.com/paywteam/eodiro/blob/master/src/modules/api-host.ts).

## Developers Guide

### Authentication

**`getAuthState({ req, res })`**

On server side, you can check the user's authentication status by using this method. It always returns the latest information by validating from the eodiro API server.

**`useAuth()`**

Inside React components, you can retrieve the same auth information with this hook. Although either you can use `getAuthState` on client side, you should not use it because the `AuthContext` that `useAuth` returns is already set by the same function internally.

### JSX className

**`mergeClassNames(...classNames)`**

It is useful when you set multiple class names in a JSX syntax, especially for optional class names with a default class. It automatically appends spaces between class names and resolves nothing with falsy values.

```tsx
const [isAppeard] = useState(false)

return <div classNames={mergeClassNames('bg', isAppeard && 'appear')} />
```

### Get the latest fresh state

If your familiar with React and React hook APIs, you know there is a problem called **stale state**. It happens when you use React state inside a callback function. The state you just use is freezed inside the callback function at the time you register it. We recognize the problem and found a solution using [functional updates](https://reactjs.org/docs/hooks-reference.html#functional-updates).

**`getState(dispatch)`**

```tsx
const [flag, setFlag] = useState(false)

setTimeout(() => {
  const flag = getState(setFlag) // It always return the latest state
  setState(!flag)
}, 1000)
```

### Components

**`Spinner`**

It displays an iOS-like spinner.

**`InfiniteScrollContainer`**

- Props
  - `children`: A wrapper element.
  - `strategy`: This method is being called when the bottom of the container reaches the end of a viewport. It returns `true` when there are more content to be loaded, `false` on the other hand.

### String Utils

**`camelToKebab(str)`**

Transform a `camelCase` string to `kebab-case`.

### Miscellaneous Modules

Along with many node modules from npm, we create, manage and provide our own useful modules which are needed specifically for our project including the modules exposed above exclusively.

**`wait(ms)`**

Synchronously block the interpretation and wait for some milliseconds.

**`getSemester()`**

Returns current semester.
