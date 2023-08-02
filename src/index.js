import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter basename='/ExpenseManager/'>
    <App />
  </BrowserRouter>,
);
