import { FetchProvider } from "./context/FetchContext";

import Header from "./components/Header";
import Main from "./components/Main";
import "./app.css";

export default function App() {

  return (
    <>
      <FetchProvider>
        <Header />
        <Main />
      </FetchProvider>
    </>
  );
}