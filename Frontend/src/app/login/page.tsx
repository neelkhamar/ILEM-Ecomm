"use client";

import ButtonComponent from "@/components/Button/button";
import { setCurrentUser } from "@/redux/User/Action";
import { loginService } from "@/requests/auth";
import { showToast } from "@/utils/commonFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [valid, setValid] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });

    useEffect(() => {
        if (currentUser) {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        let allowSubmit = false
        if (formData.email && formData.password) {
            allowSubmit = true
        }
        setValid(allowSubmit);
    }, [formData])

    const changeHandler = (key: any, value: any) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const submitHandler = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setError("");
        try {
            setLoader(true);
            let response = await loginService(formData);
            if (response?.data?.success) {
                showToast('Login successful', true);
                dispatch(setCurrentUser(response?.data?.data));
                router.push('/')
            } else {
                setError(response?.data?.message);
            }
        } catch (err) {
            setError("Something went wrong. Try again");
        } finally {
            setLoader(false);
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 my-24">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e: any) => changeHandler("email", e.target.value)}
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={formData.password} onChange={(e: any) => changeHandler("password", e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" placeholder="Remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            {
                                error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline text-sm">{error}</span>
                                    </div>
                                )
                            }
                            <ButtonComponent loading={loader} onClick={submitHandler} disabled={!valid} text="Sign in" />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;