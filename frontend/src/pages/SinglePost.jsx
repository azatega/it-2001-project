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
import { Link, Navigate, useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
    getPost,
    whoami,
    deletePost,
    likePost,
    unlikePost,
    getComments,
    createComment,
} from "@/lib/api";

export function SinglePost() {
    const { postSlug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            content: "",
        },
    });

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

    const { data: comments = [] } = useQuery({
        queryKey: ["comments", post?.id],
        queryFn: () => getComments(post.id),
        enabled: !!post?.id,
    });

    const deleteMutation = useMutation({
        mutationFn: (postId) => deletePost(postId),
        onSuccess: () => {
            navigate("/");
        },
    });

    const likeMutation = useMutation({
        mutationFn: ({ postId, isLiked }) => {
            return isLiked ? unlikePost(postId) : likePost(postId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", postSlug] });
        },
    });

    const commentMutation = useMutation({
        mutationFn: (data) => {
            return createComment({
                post_id: post.id,
                content: data.content,
            });
        },
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({ queryKey: ["comments", post.id] });
        },
    });

    const user = whoamiData?.data;
    const isAdmin = user?.role === "admin";

    const handleDelete = () => {
        deleteMutation.mutate(post.id);
    };

    const onSubmit = (data) => {
        commentMutation.mutate(data);
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
                    onClick={() =>
                        likeMutation.mutate({
                            postId: post.id,
                            isLiked: post.is_liked,
                        })
                    }
                    variant="outline"
                    disabled={!user || likeMutation.isPending}
                >
                    <HeartIcon
                        className={post.is_liked ? "text-red-500" : ""}
                        fill={post.is_liked ? "currentColor" : "transparent"}
                    />{" "}
                    {post.like_count}
                </Button>
            </div>
            <hr className="my-8" />
            <div>
                {comments.length === 0 ? (
                    <p className="text-gray-500 mb-6">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    <div className="space-y-4 mb-6">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border rounded-lg p-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold">
                                        {comment.username}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(
                                            comment.timestamp
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Textarea
                        rows={5}
                        className={"h-28"}
                        placeholder="Leave a comment..."
                        disabled={!user}
                        {...register("content", {
                            required: "Comment cannot be empty",
                            validate: (value) =>
                                value.trim().length > 0 ||
                                "Comment cannot be empty",
                        })}
                    />
                    {errors.content && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.content.message}
                        </p>
                    )}
                    <div className="flex">
                        <Button
                            className="mt-3 ml-auto"
                            size="lg"
                            type="submit"
                            disabled={!user || commentMutation.isPending}
                        >
                            <SendIcon /> Comment
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
}
