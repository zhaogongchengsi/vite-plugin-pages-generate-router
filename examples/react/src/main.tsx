import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createAppRouter } from "./routers";
import RouterRender from "./router";
import { BrowserRouter } from "react-router-dom";

(async function () {
  const routers = await createAppRouter();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App>
          <RouterRender routers={routers} />
        </App>
      </BrowserRouter>
    </React.StrictMode>
  );
})();
