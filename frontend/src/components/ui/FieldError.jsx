import { FieldDescription } from "./Field";

export function FieldError({ children, ...props }) {
    return (
        <FieldDescription className="text-red-500" {...props}>
            {children}
        </FieldDescription>
    );
}
