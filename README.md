> Documentation is outdated and will be updated with the next major release.

<a href="https://eodiro.com">
  <img src="https://user-images.githubusercontent.com/19797697/80793919-71184e00-8bd3-11ea-9ad5-a54f64cac4fd.png" />
</a>

<p align="center">
  <a href="https://github.com/payw-org/eodiro/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/payw-org/eodiro?color=ff7037" />
  </a>
  <a href="https://github.com/payw-org/eodiro/releases">
    <img src="https://img.shields.io/github/v/release/payw-org/eodiro?include_prereleases&sort=semver&label=version&color=ff006e" />
  </a>
</p>

<p align="center">An open source utility service for CAU students</p>

## Design Source

[Figma](https://www.figma.com/file/HM2QqphdWZmxF66RYmnqUXki/System?node-id=125%3A0)

## Documentation

- [Changelog](docs/Changelog.md)
- [Design Guidelines](docs/wiki/Design-Guidelines.md)
- [UI Components](docs/wiki/UI-Components.md)
- [To Do](docs/To-Do.md)

## Development

### Using Dev API Locally

You must clone and run [`eodiro-server`](https://github.com/payw-org/eodiro-server) on your local machine in dev mode.

```zsh
npm run dev
```

### Using Production API (https://api2.eodiro.com)

Also you can develop only the client application without cloning server repository `eodiro-server`.

```zsh
npm run dev --use-prod-api
```

> Recent client application in the master branch may not match to the API distributed on https://eodiro.com. To develop using the recent APIs, download and run API repository locally.

### Production Client + Dev API (localhost)

By default, `npm run dev` connects to local dev API server and `npm start` tries to connect to the real server(https://eodiro.com). However, sometimes you need to test the production-ready, built version of client application with the dev API. To achieve this, simply pass an argument similar to the one above

```zsh
npm start --use-dev-api
```

> `--use-prod-api` and `--use-dev-api` are only for the purpose of tests. Do not use them in production. For more information about API hosts, checkout the [source code](https://github.com/payw-org/eodiro/blob/master/src/modules/api-host.ts).

## Developers Guide

### Authentication

**`getAuthState({ req, res })`**

On server side, you can check the user's authentication status by using this method. It always returns the latest information by validating from the eodiro API server.

**`useAuth()`**

Inside React components, you can retrieve the same auth information with this hook. Although either you can use `getAuthState` on client side, you should not use it because the `AuthContext` that `useAuth` returns is already set by the same function internally.

### JSX className

> **Deprecated** in favor of [classnames](https://github.com/JedWatson/classnames)

**`mergeClassNames(...classNames)`**

It is useful when you set multiple class names in a JSX syntax, especially for optional class names with a default class. It automatically appends spaces between class names and resolves nothing with falsy values.

```tsx
const [isAppeard] = useState(false)

return <div classNames={mergeClassNames('bg', isAppeard && 'appear')} />
```

### Get the latest fresh state

If your familiar with React and React hook APIs, you know there is a problem called **stale state**. It happens when you use React state inside a callback function. The state you just use is freezed inside the callback function at the time you register it. We recognize the problem and found a solution using [functional updates](https://reactjs.org/docs/hooks-reference.html#functional-updates) asynchronously.

**`getState(dispatch)`**

```tsx
const [flag, setFlag] = useState(false)

setTimeout(async () => {
  const flag = await getState(setFlag) // It always return the latest state
  setState(!flag)
}, 1000)
```

### 🔌 Components

**`Body`**

**`Spinner`**

It displays an iOS-like spinner.

**`InfiniteScrollContainer`**

**Props**

- `children`: A wrapper element.
- `strategy`: This method is being called when the bottom of the container reaches the end of a viewport. It returns `true` when there are more content to be loaded, `false` on the other hand.

**`NoFooter`**

By including this component inside render function, you can hide the `GlobalFooter` which will be appended to every page globally.

**`WhiteBody`**

Set body background to pure W/B(`#ffffff`, `#000000` on dark mode). Usually use this when the content is not displayed inside blocks.

**`EodiroLink`**

### String Utils

**`camelToKebab(str)`**

Transform a `camelCase` string to `kebab-case`.

### Miscellaneous Modules

Along with many node modules from npm, we create, manage and provide our own useful modules which are needed specifically for our project including the modules exposed above explicitly.

**`wait(ms)`**

Synchronously block the interpretation and wait for some milliseconds.

**`getSemester()`**

Returns current semester.

## [License](https://github.com/payw-org/eodiro/blob/master/LICENSE)

MIT License

Copyright (c) 2021 PAYW

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
