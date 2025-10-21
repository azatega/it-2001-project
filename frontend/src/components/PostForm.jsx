import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SendIcon } from "lucide-react";
import { Link } from "react-router";
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

export function PostForm({ post, className, ...props }) {
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
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="How to Get Over Lose Streaks"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="category">
                                    Category
                                </FieldLabel>
                                <Select id="category">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="league-of-legends">
                                            League of Legends
                                        </SelectItem>
                                        <SelectItem value="tilt-management">
                                            Tilt Management
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="date">
                                    Date Published
                                </FieldLabel>
                                <DatePicker />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="image">
                                    Cover Image
                                </FieldLabel>
                                <Input
                                    id="image"
                                    type="file"
                                    className="cursor-pointer"
                                    required
                                />
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
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel>Content</FieldLabel>
                                </div>
                                <SunEditor
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
                            <Field>
                                <div className="flex gap-4">
                                    <Button asChild variant="outline">
                                        <Link to="/">Cancel</Link>
                                    </Button>
                                    <Button type="submit" className="ml-auto">
                                        <SendIcon /> Save{" "}
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
