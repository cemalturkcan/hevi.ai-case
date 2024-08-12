import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.tsx";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./locales/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router}></RouterProvider>
    </PrimeReactProvider>
  </StrictMode>,
);
