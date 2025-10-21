import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function BackButton() {
    return (
        <Link
            to="/"
            className="flex gap-1.5 items-center text-base text-gray-700 hover:text-black"
        >
            <ArrowLeft className="size-5" /> Go back
        </Link>
    );
}
