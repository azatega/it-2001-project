import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { Button } from "@/components/ui/button";
import { Home } from "@/pages/Home";
import { SinglePost } from "@/pages/SinglePost";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/posts/:postUUID",
        element: <SinglePost />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />,
    </StrictMode>
);
