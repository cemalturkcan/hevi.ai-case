import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout.tsx";
import Home from "@/views/home/Home.tsx";
import CornerstoneViewer from "@/views/viewer/Viewer.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/viewer/:id",
        element: <CornerstoneViewer />,
      },
    ],
  },
]);
