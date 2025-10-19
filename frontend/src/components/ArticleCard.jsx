import { HeartIcon } from "lucide-react";
import { Link } from "react-router";

export function ArticleCard({ post }) {
    return (
        <Link className="focus:outline-none">
            <article className="flex flex-col items-start justify-between hover:-translate-y-1 transition ease-in-out">
                <div className="relative w-full">
                    <img
                        alt=""
                        src={post.imageUrl}
                        className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="flex max-w-xl grow flex-col justify-between">
                    <div className="mt-4 flex items-center gap-x-4 text-xs">
                        <time
                            dateTime={post.datetime}
                            className="text-gray-500"
                        >
                            {post.date}
                        </time>
                        <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                            {post.category.name}
                        </p>
                    </div>
                    <div className="group relative grow">
                        <h3 className="mt-2	text-lg/6 font-semibold text-gray-900">
                            <span className="absolute inset-0" />
                            {post.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm/6 text-gray-600">
                            {post.description}
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
}
