import { PostForm } from "@/components/PostForm";
import { BackButton } from "@/components/ui/BackButton";
import { Container } from "@/components/ui/Container";

export function NewPost() {
    return (
        <Container className="max-w-3xl py-4">
            <BackButton />
            <PostForm className="mt-3" />
        </Container>
    );
}
