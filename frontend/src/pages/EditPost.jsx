import { PostForm } from "@/components/PostForm";
import { BackButton } from "@/components/ui/BackButton";
import { Container } from "@/components/ui/Container";
import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/lib/api";

export function EditPost() {
    const { postSlug } = useParams();
    const {
        data: post,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["post", postSlug],
        queryFn: () => getPost(postSlug),
    });

    if (isLoading) {
        return (
            <Container className="max-w-3xl py-4">
                <p className="text-center text-gray-500">Loading post...</p>
            </Container>
        );
    }

    if (isError || !post) return <Navigate to="/" />;

    return (
        <Container className="max-w-3xl py-4">
            <BackButton />
            <PostForm post={post} className="mt-3" />
        </Container>
    );
}
