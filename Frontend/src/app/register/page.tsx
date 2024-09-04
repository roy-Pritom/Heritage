"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import { registerUser } from "@/components/Server/registerUser";
import { userLogin } from "@/components/Server/userlogin";
import { storeUserInfo } from "@/components/Server/auth.service";

// Define form data type
interface FormData {
    firstName: string;
    lastName: string;
    gender: string;
    location: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const handleRegister: SubmitHandler<FormData> = async (values) => {
        const toastId = toast.loading("Processing...");
        // console.log(values);

        const userData = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            location: values.location,
            email: values.email,
            password: values.password,
        };

        try {
            const res = await registerUser(userData);
            if (res?.success) {
                const loggedInUser = await userLogin({ email: values.email, password: values.password });
                // console.log(loggedInUser);
                if (loggedInUser?.data?.accessToken) {
                    storeUserInfo(loggedInUser?.data?.accessToken);
                    toast.success("User registered successfully!", { id: toastId, duration: 1000 });
                    router.push("/");
                }
            } else {
                toast.error(res?.message, { id: toastId, duration: 1000 });
            }
        } catch (error: any) {
            toast.error(error?.message, { id: toastId, duration: 1000 });
        }
    };

    return (
        <div className="h-full bg-gray-400">
            <div className="mx-auto">
                <div className="flex justify-center px-6 py-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        {/* Background Image Section */}
                        <div
                            className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage:
                                    "url('https://img.freepik.com/free-photo/sign-up-form-button-graphic-concept_53876-133556.jpg?t=st=1717490088~exp=1717493688~hmac=9b13c588adbfcb0d1523b6fadc72be3d02b85fcabec41cf78131cb45cffa2fdc&w=996')",
                            }}
                        ></div>
                        {/* Form Section */}
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-black">
                                Create an Account!
                            </h3>
                            <form onSubmit={handleSubmit(handleRegister)}>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <Input
                                            {...register("firstName", { required: "First name is required" })}
                                            fullWidth
                                            label="First Name"
                                            placeholder="First Name"

                                        />
                                        {errors.firstName && (
                                            <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div className="md:ml-2">
                                        <Input
                                            {...register("lastName", { required: "Last name is required" })}
                                            fullWidth
                                            label="Last Name"
                                            placeholder="Last Name"
                                        />
                                        {errors.lastName && (
                                            <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Input
                                        {...register("gender", {
                                            required: "Gender is required",
                                            validate: (value) =>
                                                value.toLowerCase() === "male" || value.toLowerCase() === "female" || "Gender must be either 'male' or 'female'",
                                        })}
                                        fullWidth
                                        label="Gender"
                                        placeholder="Gender (e.g., male, female)"
                                    />
                                    {errors.gender && (
                                        <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
                                    )}

                                </div>
                                <div className="mb-4">
                                    <Input
                                        {...register("location", {
                                            required: "Location is required",
                                        })}
                                        fullWidth
                                        label="Location"
                                        placeholder="Location (e.g., Dhaka, Bangladesh)"
                                    />
                                    {errors.location && (
                                        <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <Input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Please enter a valid email address",
                                            },
                                        })}
                                        fullWidth
                                        label="Email"
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <Input
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters long",
                                            },
                                        })}
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        placeholder="Password"

                                    />
                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                                    )}
                                </div>
                                <div className="mb-6 text-center">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900"
                                    >
                                        Register Account
                                    </Button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="text-center">
                                    <Link
                                        href="/login"
                                        className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        Already have an account? Login!
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
