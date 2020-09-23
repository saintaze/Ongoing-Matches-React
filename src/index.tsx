import React from "react";
import ReactDOM from "react-dom";

export const App = () => {
  return (
    <div>
      <h1>On Going Games</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
