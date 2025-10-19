import { PostMeta } from "@/components/PostMeta";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Textarea } from "@/components/ui/textarea";
import { examplePosts } from "@/lib/exampleData";
import {
    ArrowLeft,
    EditIcon,
    HeartIcon,
    SendIcon,
    TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";

export function SinglePost() {
    const { postSlug } = useParams();
    const post = examplePosts.find((post) => post.slug == postSlug);

    const [isLiked, setIsLiked] = useState(false);

    if (!post) return <Navigate to="/" />;

    return (
        <Container className="py-8 max-w-3xl">
            <BackButton />
            <img
                src={post.imageUrl}
                className="mt-6 w-full aspect-[16/9] object-cover rounded-xl"
            />
            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                {post.title}
            </h2>
            <PostMeta post={post} className="mt-2" />

            <article class="prose text-justify mt-4 w-full max-w-full">
                <p>{post.excerpt}</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    facilisis eu metus vitae imperdiet. Aliquam sed lectus a
                    massa ullamcorper scelerisque et a orci. Suspendisse lectus
                    orci, hendrerit id libero a, fringilla porta elit. Sed ac
                    velit eu ipsum tincidunt lobortis vel et elit. Suspendisse
                    potenti. Aliquam ultrices sodales risus nec tincidunt. Donec
                    molestie dapibus orci, at vehicula leo tincidunt ut. Nunc
                    suscipit fringilla nunc ut commodo. In porta justo neque.
                    Suspendisse feugiat felis in pharetra molestie. Quisque sed
                    mauris vitae quam mattis semper quis sed nunc. Fusce vitae
                    tellus vel dolor elementum aliquam.
                </p>
                <p>
                    Fusce ipsum ligula, consequat sed felis vitae, accumsan
                    condimentum tortor. Curabitur quam lacus, laoreet quis
                    malesuada ut, interdum sit amet ligula. Ut sit amet purus
                    eget odio laoreet fermentum eu ac eros. Quisque orci ante,
                    tincidunt ut tellus in, consectetur fermentum neque. Duis
                    consequat magna ut elementum luctus. Praesent molestie vitae
                    metus at porta. Proin neque est, condimentum non elit in,
                    viverra fringilla ipsum.
                </p>
                <p>
                    Nam convallis sem leo. In mollis gravida interdum. Nunc eget
                    velit dictum, auctor lacus non, ultricies elit. Vivamus
                    pretium tempor pharetra. Donec imperdiet consequat ligula a
                    eleifend. Curabitur vel est auctor, dictum magna at, lacinia
                    enim. Aenean eleifend sed dolor non condimentum. Cras nec
                    dolor tempus, pharetra nulla at, vulputate nisi. Morbi in
                    facilisis nibh. Duis tristique gravida risus, id tempor
                    felis. Praesent placerat sem quam.
                </p>
            </article>

            <div className="flex mt-6 gap-4 items-center justify-end">
                <Button variant="outline">
                    <TrashIcon /> Delete
                </Button>
                <Button asChild variant="outline">
                    <Link to={`/posts/${post.slug}/edit`}>
                        <EditIcon /> Edit
                    </Link>
                </Button>
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
