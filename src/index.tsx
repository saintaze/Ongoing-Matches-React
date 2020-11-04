import React from "react";
import ReactDOM from "react-dom";
import Series from './components/Series';

import './index.scss';

export const App = () => {
  return (
    <div>
      <Series />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
