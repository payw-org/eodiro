export default `
<div
  class="join-body"
  style="
    padding: 0;
    margin: 0;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-top: 50px;
    width: 100%;
  "
>
  <div
    class="join-container"
    style="
      box-sizing: border-box;
      width: calc(100% - 40px);
      max-width: 500px;
      margin: auto;
      background-color: #f5f6f8;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
    "
  >
    <img
      src="https://eodiro.com/icon-512.png"
      class="logo"
      style="
        width: 100%;
        max-width: 100px;
        margin: auto;
      "
    />
    <div
      class="content"
      style="
        margin-top: 20px;
        padding-bottom: 20px;
      "
    >
      <p
        class="description"
        style="
          font-size: 15px;
          font-weight: 400;
          color: #808080;
          margin: 0;
          margin-top: 10px;
        "
      >
        아래 버튼을 클릭해 암호 변경을 마치세요.
      </p>
      <a href="https://eodiro.com/forgot/change-password?t={{token}}" target="_blank">
        <button
          class="join-btn"
          style="
            padding: 10px 15px;
            appearance: none;
            -webkit-appearance: none;
            background: none;
            border: none;
            background-color: #ff3852;
            color: #fff;
            font-size: 15px;
            font-weight: 500;
            margin: 0;
            margin-top: 40px;
            border-radius: 8px;
            cursor: pointer;
          "
        >
          암호 변경
        </button>
      </a>
    </div>
  </div>
  <div
    class="footer"
    style="
      font-size: 14px;
      color: #808080;
      text-align: center;
      padding: 50px 20px;
    "
  >
    <a
      href="https://payw.org"
      target="_blank"
      style="
        color: inherit;
        text-decoration: none;
      "
    >
      © PAYW
    </a>
  </div>
</div>
`
