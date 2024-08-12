import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./locales/i18n.ts";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.tsx";
import Loader from "./layout/loader/Loader.tsx";

function App() {
  return (
    <StrictMode>
      <Loader router={router} />
      <PrimeReactProvider>
        <RouterProvider router={router}></RouterProvider>
      </PrimeReactProvider>
    </StrictMode>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
