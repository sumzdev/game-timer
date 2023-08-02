import { css } from "@emotion/react";

const GlobalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    --font-color: #444444;
    --btn-color: #1976d2;
    --green: #c6ecc6;
    --red: #ecb9b9;
    --yellow: #fff8be;
    --gray: #cbcaca;
    --border-green: #70bc70;
    --border-gray: #9e9d9d;
    --border-red: #c96861;
    --border-yellow: #e8d959;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: "Noto Sans KR", sans-serif;
  }

  ul,
  li {
    list-style-type: none;
    padding-left: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
