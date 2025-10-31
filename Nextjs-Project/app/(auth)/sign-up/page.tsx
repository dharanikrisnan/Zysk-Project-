"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Lottie from "lottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const userSignUp = z
  .object({
    name: z.string().min(6, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof userSignUp>;


async function submitSignUp(
  formData: SignUpForm
): Promise<{ success: boolean; message: string }> {
  const result = await fetch(
    `http://localhost:4000/users?email=${formData.email}`
  );
  const data = await result.json();

  if (data.length > 0) {
    throw new Error("Email already registered");
  }

  await fetch(`http://localhost:4000/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(formData),
  });

  return { success: true, message: "Account created successfully" };
}

export default function SignUpContainer() {
  const [animationData, setAnimationData] = useState<
    Record<string, unknown> | null
  >(null);

  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    resolver: zodResolver(userSignUp),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: submitSignUp,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/sign-in");
    },
    onError: (error: unknown) => {
      const err = error as Error;
      toast.error(`Sign-Up Failed! Error: ${err.message}`);
    },
  });

  const onSubmit = (data: SignUpForm) => {
    signUpMutation.mutate(data);
  };

  useEffect(() => {
    fetch("/lotties/login.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Error loading Lottie JSON:", err));
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="flex bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden max-w-5xl w-full">
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-center text-3xl font-extrabold text-purple-800">
            Create Account
          </h1>
          <p className="text-center text-gray-600 mt-2 text-sm">
            Please enter your credentials to access your account
          </p>

          <form
            className="mt-8 space-y-5 flex flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {signUpMutation.isError && (
              <p className="text-red-500 text-sm mt-1 text-center w-[85%]">
                Error: {(signUpMutation.error as Error).message}
              </p>
            )}

            <div className="flex flex-col space-y-1 w-[85%]">
              <Label
                htmlFor="name"
                className="text-gray-700 text-sm font-medium"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Good name"
                {...register("name")}
                className="border-gray-300 focus:ring-2 focus:ring-gray-400 px-2 py-2 border text-sm"
              />
              {formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1 w-[85%]">
              <Label
                htmlFor="email"
                className="text-gray-700 text-sm font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="border-gray-300 focus:ring-2 focus:ring-gray-400 px-2 py-2 border text-sm"
              />
              {formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1 w-[85%]">
              <Label
                htmlFor="password"
                className="text-gray-700 text-sm font-medium"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                {...register("password")}
                className="border-gray-300 focus:ring-2 focus:ring-gray-400 px-2 py-2 border text-sm"
              />
              {formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1 w-[85%]">
              <Label
                htmlFor="confirm-password"
                className="text-gray-700 text-sm font-medium"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="*********"
                {...register("confirmPassword")}
                className="border-gray-300 focus:ring-2 focus:ring-gray-400 px-2 py-2 border text-sm"
              />
              {formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={signUpMutation.isPending}
              className="w-50 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 transition-colors duration-200"
            >
              {signUpMutation.isPending ? "Processing..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-blue-800 font-medium hover:underline transition-all duration-300"
            >
              Sign&nbsp;In
            </Link>
          </p>
        </div>

        <div className="w-1/2 bg-purple-50 flex justify-center items-center p-8">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="w-[400px] h-[400px]"
            />
          ) : (
            <p className="text-gray-500">Loading animation...</p>
          )}
        </div>
      </div>
    </div>
  );
}
