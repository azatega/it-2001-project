import { cn } from "@/lib/utils";

export function Container({ children, className }) {
    return (
        <div className={cn("max-w-7xl mx-auto px-4 sm:px-8", className)}>
            {children}
        </div>
    );
}
