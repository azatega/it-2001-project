import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/Field";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/Input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/api";

export function LoginForm({ className, ...props }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const loginMutation = useMutation({
        mutationFn: async ({ username, password }) => {
            const data = await login(username, password);
            if (data.data && data.data.token) {
                localStorage.setItem("jwt_token", data.data.token);
                queryClient.invalidateQueries();
                navigate("/");
            }
            return data;
        },
    });
    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your username below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">
                                    Username
                                </FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="azatega"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                />
                                {errors.username && (
                                    <FieldError>
                                        {errors.username.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                                {errors.password && (
                                    <FieldError>
                                        {errors.password.message}
                                    </FieldError>
                                )}
                            </Field>
                            {loginMutation.isError && (
                                <FieldError>
                                    {loginMutation.error.message}
                                </FieldError>
                            )}
                            <Field>
                                <Button
                                    type="submit"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending
                                        ? "Logging in..."
                                        : "Login"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don't have an account?{" "}
                                    <Link to="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
