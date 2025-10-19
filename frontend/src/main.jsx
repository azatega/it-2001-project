import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { Button } from "@/components/ui/button";
import { Home } from "@/pages/Home";
import { SinglePost } from "@/pages/SinglePost";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/posts/:postUUID",
        element: <SinglePost />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />,
    </StrictMode>
);
