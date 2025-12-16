import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/Field";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SendIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import SunEditor from "suneditor-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { DatePicker } from "@/components/ui/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost, updatePost, getCategories } from "@/lib/api";
import { useState, useEffect } from "react";

export function PostForm({ post, className, ...props }) {
    const navigate = useNavigate();
    const [content, setContent] = useState(post?.content || "");
    const [datePublished, setDatePublished] = useState(
        post?.date_published ? new Date(post.date_published) : new Date()
    );

    console.log(datePublished);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            category_id: post?.category_id?.toString() || "",
            excerpt: post?.excerpt || "",
        },
    });

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                category_id: post.category_id?.toString() || "",
                excerpt: post.excerpt || "",
            });
            setContent(post.content || "");
            setDatePublished(
                post.date_published ? new Date(post.date_published) : new Date()
            );
        }
    }, [post, reset]);

    const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const savePostMutation = useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("category_id", data.category_id);
            formData.append("excerpt", data.excerpt || "");
            formData.append("content", content);

            // Format date to MySQL datetime format
            const formattedDate = datePublished
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
            formData.append("date_published", formattedDate);

            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            if (post) {
                return await updatePost(post.id, formData);
            } else {
                return await createPost(formData);
            }
        },
        onSuccess: (data) => {
            if (post) {
                navigate(`/posts/${post.slug}`);
            } else {
                navigate("/");
            }
        },
    });

    const onSubmit = (data) => {
        savePostMutation.mutate(data);
    };
    const categories = categoriesData || [];

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {post ? `Edit ${post.title}` : "Post a new article"}
                    </CardTitle>
                    <CardDescription>
                        Please enter the information and content below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="How to Get Over Lose Streaks"
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.title && (
                                    <FieldError>
                                        {errors.title.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="category_id">
                                    Category
                                </FieldLabel>
                                <Controller
                                    name="category_id"
                                    control={control}
                                    rules={{ required: "Category is required" }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoriesLoading ? (
                                                    <SelectItem
                                                        value="loading"
                                                        disabled
                                                    >
                                                        Loading...
                                                    </SelectItem>
                                                ) : (
                                                    categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={category.id.toString()}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        )
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category_id && (
                                    <FieldError>
                                        {errors.category_id.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="date_published">
                                    Date Published
                                </FieldLabel>
                                <DatePicker
                                    date={datePublished}
                                    setDate={setDatePublished}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="image">
                                    Cover Image
                                </FieldLabel>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    className="cursor-pointer"
                                    {...register("image", {
                                        required: post
                                            ? false
                                            : "Cover image is required",
                                    })}
                                />
                                {errors.image && (
                                    <FieldError>
                                        {errors.image.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="excerpt">
                                        Excerpt
                                    </FieldLabel>
                                </div>
                                <Textarea
                                    id="excerpt"
                                    placeholder="Apparently harder than finding a spouse."
                                    {...register("excerpt")}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel>Content</FieldLabel>
                                </div>
                                <SunEditor
                                    setContents={content}
                                    onChange={setContent}
                                    setOptions={{
                                        minHeight: "160px",
                                        buttonList: [
                                            ["formatBlock"],
                                            [
                                                "bold",
                                                "underline",
                                                "italic",
                                                "strike",
                                            ],
                                            ["undo", "redo"],
                                            ["removeFormat"],
                                        ],
                                    }}
                                />
                            </Field>
                            {savePostMutation.isError && (
                                <FieldError>
                                    {savePostMutation.error.message}
                                </FieldError>
                            )}
                            <Field>
                                <div className="flex gap-4">
                                    <Button asChild variant="outline">
                                        <Link to="/">Cancel</Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="ml-auto"
                                        disabled={savePostMutation.isPending}
                                    >
                                        <SendIcon />
                                        {savePostMutation.isPending
                                            ? "Saving..."
                                            : "Save"}
                                    </Button>
                                </div>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
