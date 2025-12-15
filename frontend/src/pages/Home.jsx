import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { examplePosts } from "@/lib/exampleData";
import { LogInIcon, LogOutIcon, SendIcon } from "lucide-react";
import { Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { whoami, logout } from "@/lib/api";

export function Home() {
    const queryClient = useQueryClient();
    const { data: whoamiData, isLoading } = useQuery({
        queryKey: ["whoami"],
        queryFn: whoami,
        retry: false,
    });

    const user = whoamiData?.data;
    const isLoggedIn = !!user;
    const isAdmin = user?.role === "admin";

    const handleLogout = () => {
        logout();
        queryClient.invalidateQueries();
    };

    return (
        <div className="py-16">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Personal Blog
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600">
                        A place to share my thoughts and feelings.
                    </p>

                    <div className="mt-4 flex gap-4 justify-center">
                        {isLoggedIn && isAdmin && (
                            <Button asChild>
                                <Link to="/posts/new">
                                    <SendIcon className="size-4" /> New Post
                                </Link>
                            </Button>
                        )}

                        {!isLoggedIn && (
                            <Button asChild variant="outline">
                                <Link to="/login">
                                    <LogInIcon /> Log in
                                </Link>
                            </Button>
                        )}

                        {isLoggedIn && (
                            <Button variant="outline" onClick={handleLogout}>
                                <LogOutIcon /> Log out
                            </Button>
                        )}
                    </div>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {examplePosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
