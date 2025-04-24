import React from "react";
import ReactDOM from "react-dom/client";
import 'react-quill/dist/quill.snow.css';
import "jsvectormap/dist/css/jsvectormap.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-modal-video/css/modal-video.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppLoader from "./components/child/AppLoader";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <React.StrictMode>
    <BrowserRouter>
      <AppLoader>
        <App />
      </AppLoader>
      </BrowserRouter>
      </React.StrictMode>

  </>
);

reportWebVitals();
