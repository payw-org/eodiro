export const template = `
<div class="eodiro-dialog" tabindex="0">
  <div class="wall"></div>
  <div class="content">
    <div class="message"></div>
    <div class="actions">
      <div class="act cancel">
        <button>{{ cancelLabel }}</button>
      </div>
      <div class="act confirm">
        <button>{{ confirmLabel }}</button>
      </div>
      <div class="act close">
        <button>{{ closeLabel }}</button>
      </div>
    </div>
  </div>
</div>
`
