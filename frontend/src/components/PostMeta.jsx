import { cn } from "@/lib/utils";

export function PostMeta({ post, className }) {
    return (
        <div
            className={cn("mt-4 flex items-center gap-x-4 text-xs", className)}
        >
            <time dateTime={post.date} className="text-gray-500">
                {post.date}
            </time>
            <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                {post.category.name}
            </p>
        </div>
    );
}
