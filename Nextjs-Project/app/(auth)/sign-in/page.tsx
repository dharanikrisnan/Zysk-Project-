"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Lottie from "lottie-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {useRouter} from "next/navigation";

const userSignIn = z.object({
    email: z.string().email("Invlaid email address"),
    password: z.string().min(6, "Passoword must be atleast 6 characters"),
});

type SignInForm = z.infer<typeof userSignIn>;


async function LoginData(formData: SignInForm): Promise<{ success: boolean; message: string }> {

     const results = await fetch(`http://localhost:4000/users?email=${formData.email}`)
     const users = await results.json()

     if (users.length === 0)
     {
        throw new Error("User not found . please sign up");
        
     }

     const user=users[0]

     if(user.password !== formData.password)
     {
        throw new Error("Incorrect password. Try again");
        
     }
    return {
        success: true, message: "Logged In Successfully"
    }
}


export default function LoginContainer() {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        fetch("/lotties/login.json")
            .then((res) => res.json())
            .then(setAnimationData)
            .catch((err) => console.error("Error loading Lottie JSON:", err));
    }, []);

    const { register, handleSubmit, formState } = useForm<SignInForm>({
        resolver: zodResolver(userSignIn),
        defaultValues: { email: "", password: "" },
    });
    
    const router =useRouter();

    const LoginMutation = useMutation({
        mutationFn: LoginData,
        onSuccess: () => {
            router.push("/course");
        },
        onError: (error) => {
            console.error(`Sign-Up Failed! Error: ${error.message}`);
        },
    });

    const onSubmit = (data: SignInForm) => {
        LoginMutation.mutate(data);
    };
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
            <div className="flex bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden max-w-5xl w-full">

                <div className="w-1/2 p-10 flex flex-col justify-center">
                    <h1 className="text-center text-3xl font-extrabold text-purple-800">
                        Welcome to EduTech
                    </h1>
                    <p className="text-center text-gray-600 mt-2 text-sm">
                        Please enter your credentials to access your account
                    </p>
                    {LoginMutation.isSuccess &&(
                        <p className="text-green-600 text-sm mt-4 text-center w-[80%] mx-auto border border-green-300 bg-green-50 p-3 rounded-xl shadow-md">
                            {LoginMutation.data?.message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col items-center space-y-6">
                        {LoginMutation.isError &&(
                            <p className="text-red-500 text-sm mt-1 text-center w-[80%] border border-red-300 bg-red-50 p-2 rounded-lg">
                                Server Error :{LoginMutation.error.message}
                            </p>
                        )}
                        <div className="flex flex-col w-[80%]">
                            <Label
                                htmlFor="email"
                                className="text-gray-700 text-sm font-medium mt-3"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className="mt-1 border-gray-300 w-70 rounded border text-sm"
                            />
                            {formState.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col w-[80%] ">
                            <Label
                                htmlFor="password"
                                className="text-gray-700 text-sm font-medium"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                                className="mt-1 border-gray-300 rounded w-70 text-sm "
                            />
                            {formState.errors.password && (
                                <p className="text-red-500 text-sm mt-1">{formState.errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-[50%] bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                            disabled={LoginMutation.isPending}>
                           {LoginMutation.isPending ? "Logging..." :"Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Don't have an account?{" "}
                        <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                            <Link href="/sign-up">Sign-Up</Link>
                        </span>
                    </p>
                </div>
                <div className="w-1/2 bg-purple-50 flex justify-center items-center p-8">
                    {animationData ? (
                        <Lottie animationData={animationData} loop autoplay className="w-[400px] h-[400px]" />
                    ) : (
                        <p className="text-gray-500">Loading animation...</p>
                    )}
                </div>
            </div>
        </div>
    );
}


