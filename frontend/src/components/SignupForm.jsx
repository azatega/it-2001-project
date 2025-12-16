import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerUser } from "@/lib/api";

export function SignupForm({ ...props }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch("password");

    const signupMutation = useMutation({
        mutationFn: async (userData) => {
            const data = await registerUser(userData);
            if (data.data && data.data.token) {
                localStorage.setItem("jwt_token", data.data.token);
                queryClient.invalidateQueries();
                navigate("/");
            }
            return data;
        },
    });
    const onSubmit = (data) => {
        const { confirmPassword, ...userData } = data;
        signupMutation.mutate(userData);
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
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
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            {errors.password ? (
                                <FieldError>
                                    {errors.password.message}
                                </FieldError>
                            ) : (
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirmPassword">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword ? (
                                <FieldError>
                                    {errors.confirmPassword.message}
                                </FieldError>
                            ) : (
                                <FieldDescription>
                                    Please confirm your password.
                                </FieldDescription>
                            )}
                        </Field>
                        {signupMutation.isError && (
                            <FieldError>
                                {signupMutation.error.message}
                            </FieldError>
                        )}
                        <FieldGroup>
                            <Field>
                                <Button
                                    type="submit"
                                    disabled={signupMutation.isPending}
                                >
                                    {signupMutation.isPending
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account?{" "}
                                    <Link to="/login">Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
