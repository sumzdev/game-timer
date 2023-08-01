import { Global } from "@emotion/react";
import { Layout } from "./components";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout />
    </>
  );
}

export default App;
