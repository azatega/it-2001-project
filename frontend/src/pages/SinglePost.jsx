import { PostMeta } from "@/components/PostMeta";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/constants";
import {
    ArrowLeft,
    EditIcon,
    HeartIcon,
    SendIcon,
    TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPost, whoami, deletePost } from "@/lib/api";

export function SinglePost() {
    const { postSlug } = useParams();
    const navigate = useNavigate();
    const {
        data: post,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["post", postSlug],
        queryFn: () => getPost(postSlug),
    });

    const { data: whoamiData } = useQuery({
        queryKey: ["whoami"],
        queryFn: whoami,
        retry: false,
    });

    const deleteMutation = useMutation({
        mutationFn: (postId) => deletePost(postId),
        onSuccess: () => {
            navigate("/");
        },
    });

    const [isLiked, setIsLiked] = useState(false);

    const user = whoamiData?.data;
    const isAdmin = user?.role === "admin";

    const handleDelete = () => {
        deleteMutation.mutate(post.id);
    };

    if (isLoading) {
        return (
            <Container className="py-8 max-w-3xl">
                <p className="text-center text-gray-500">Loading post...</p>
            </Container>
        );
    }

    if (isError || !post) return <Navigate to="/" />;

    return (
        <Container className="py-8 max-w-3xl">
            <BackButton />
            <img
                src={post.image && `${API_BASE_URL}uploads/${post.image}`}
                className="mt-6 w-full aspect-[16/9] object-cover rounded-xl"
            />
            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                {post.title}
            </h2>
            <PostMeta post={post} className="mt-2" />

            <article
                class="prose text-justify mt-4 w-full max-w-full"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex mt-6 gap-4 items-center justify-end">
                {isAdmin && (
                    <>
                        <Button variant="outline" onClick={handleDelete}>
                            <TrashIcon /> Delete
                        </Button>
                        <Button asChild variant="outline">
                            <Link to={`/posts/${post.slug}/edit`}>
                                <EditIcon /> Edit
                            </Link>
                        </Button>
                    </>
                )}
                <Button
                    className={"w-20"}
                    onClick={() => setIsLiked(!isLiked)}
                    variant="outline"
                >
                    <HeartIcon
                        className={isLiked ? "text-red-500" : ""}
                        fill={isLiked ? "currentColor" : "transparent"}
                    />{" "}
                    {isLiked ? "1" : "0"}
                </Button>
            </div>
            <hr className="my-8" />
            <div>
                <Textarea
                    rows={5}
                    className={"h-28"}
                    placeholder="Leave a comment..."
                ></Textarea>
                <div className="flex">
                    <Button className="mt-3 ml-auto" size="lg">
                        <SendIcon /> Comment
                    </Button>
                </div>
            </div>
        </Container>
    );
}
