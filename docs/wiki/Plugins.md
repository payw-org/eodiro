## eodiro Dialog

```ts
import Dialog from '~/plugins/eodiro-dialog'
```

**`alert(message)`**

```ts
new Dialog().alert('Hello World!')
```

**`confirm(message)`**

```ts
new Dialog().confirm('Do you confirm?')
  .then((response) => {
    // Do something with response
  })

// Using async/await
async function () {
  const response = await new Dialog().confirm('Do you confirm?')
  // Do something with response
}
```

**`vagabond(message)`**

```ts
new Dialog().vagabond('It disappears automatically after some time')