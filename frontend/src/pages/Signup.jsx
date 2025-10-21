import { SignupForm } from "@/components/SignupForm";
import { BackButton } from "@/components/ui/BackButton";
import { Container } from "@/components/ui/Container";

export function Signup() {
    return (
        <Container className="max-w-lg py-16">
            <BackButton />
            <SignupForm className="mt-3" />
        </Container>
    );
}
