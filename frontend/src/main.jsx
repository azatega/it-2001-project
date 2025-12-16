import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { Button } from "@/components/ui/button";
import { Home } from "@/pages/Home";
import { SinglePost } from "@/pages/SinglePost";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { NewPost } from "@/pages/NewPost";
import { EditPost } from "@/pages/EditPost";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/posts/:postSlug",
        element: <SinglePost />,
    },
    {
        path: "/posts/:postSlug/edit",
        element: <EditPost />,
    },
    {
        path: "/posts/new",
        element: <NewPost />,
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
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
);
