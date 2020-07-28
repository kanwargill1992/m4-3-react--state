import React from "react";
import data from "../data";
import GlobalStyles from "./GlobalStyles";
import Typehead from "./Typehead";

const App = (props) => {
  return (
    <>
      <GlobalStyles />

      <Typehead
        suggestions={data.books}
        handleSelect={(suggestion) => {
          window.alert(suggestion);
        }}
      />
    </>
  );
};

export default App;
