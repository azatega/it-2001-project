import { ArticleCard } from "@/components/ArticleCard";
import { Container } from "@/components/ui/Container";

import examplePost1Image from "@/assets/example-post-1.jpg";
import examplePost2Image from "@/assets/example-post-2.jpg";

export function Home() {
    const examplePosts = [
        {
            uuid: "example-post-1",
            title: "How to Find a Good Duo Partner for League",
            description: "Apparently harder than finding a spouse.",
            imageUrl: examplePost1Image,
            date: "2025-02-01",
            datetime: "2025-02-01",
            category: { name: "League of Legends" },
            href: "/posts/example-post-1",
        },
        {
            uuid: "example-post-2",
            title: "How to Get Over Lose Streaks",
            description:
                "Sometimes, through no fault of your own, you find yourself on a losing streak. Here's how to cope.",
            imageUrl: examplePost2Image,
            date: "2025-02-02",
            datetime: "2025-02-02",
            category: { name: "Tilt Management" },
            href: "/posts/example-post-2",
        },
    ];

    return (
        <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Personal Blog
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600">
                        A place to share my thoughts and feelings.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {examplePosts.map((post) => (
                        <ArticleCard key={post.uuid} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
