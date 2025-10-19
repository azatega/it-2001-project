import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { Button } from "@/components/ui/button";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="p-4">
                <Button size="lg">Hello</Button>
            </div>
        ),
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />,
    </StrictMode>
);
