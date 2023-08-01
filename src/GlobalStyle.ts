import { css } from "@emotion/react";

const GlobalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    --btn-color: #1976d2;
  }

  html,
  body {
    width: 100vw;
    height: 100vh;
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
`;

export default GlobalStyle;
