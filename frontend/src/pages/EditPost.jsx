import { PostForm } from "@/components/PostForm";
import { BackButton } from "@/components/ui/BackButton";
import { Container } from "@/components/ui/Container";
import { examplePosts } from "@/lib/exampleData";
import { Navigate, useParams } from "react-router";

export function EditPost() {
    const { postSlug } = useParams();
    const post = examplePosts.find((post) => post.slug == postSlug);

    if (!post) return <Navigate to="/" />;

    return (
        <Container className="max-w-3xl py-4">
            <BackButton />
            <PostForm post={post} className="mt-3" />
        </Container>
    );
}
