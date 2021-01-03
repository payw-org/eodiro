## CAU Notice Watcher

**CAU Notice Watcher** walks through the subscribed notice websites every 15 minutes and checks whether there are any new notices or not.

### Subscriber

Subscriber is an **object** containing the information of a notice target.

Here is an example for the notice of CAU CSE(소프트웨어학부).

```ts
export const cse: Subscriber = {
  name: '소프트웨어학부',
  key: 'cse',
  url: 'https://cse.cau.ac.kr/sub05/sub0501.php',
  noticeItemSelector: '.table-basic tbody tr',
  titleBuilder: (noticeElm) =>
    noticeElm.querySelector('a').textContent.trim().replace(/NEW$/, '').trim(),
}
```

#### `name: string`

It is a name that will be displayed on the users.

#### `key: string`

It is a unique key string indicating the notice target. If a notice URL is like `xxx.cau.ac.kr`, use `xxx` as the key. If not, create a proper key string in `kebab-case`.

#### `url: string`

The URL where the notice page resides.

#### `noticeItemSelector: string`

A CSS selector which will be used as selecting notice items in the page.

#### `titleBuilder: (noticeItemElement: HTMLElement | Element) => string`

It constructs a notice title. A selected HTML element with the `noticeItemSelector` will be passed as the first argument.

### Developer Guides

1. Create a subscriber TypeScript source file under the `src/modules/cau-notice-watcher/subscribers/` with the key name described above.
2. Inside the source file, import `Subscriber` type and export a constant with the name **key in camelCase** which type is `Subscriber`.
3. If you're done, open `src/modues/cau-notice-watcher/subscribers/index.ts` and export all from the source file you've just created.

> If you don't know how to do it, refer to other existing files.
