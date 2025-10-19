import { LoginForm } from "@/components/LoginForm";
import { BackButton } from "@/components/ui/BackButton";
import { Container } from "@/components/ui/Container";

export function Login() {
    return (
        <Container className="max-w-lg py-16">
            <BackButton />
            <LoginForm className="mt-3" />
        </Container>
    );
}
