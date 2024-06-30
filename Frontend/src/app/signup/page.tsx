"use client";

import ButtonComponent from "@/components/Button/button";
import { setCurrentUser } from "@/redux/User/Action";
import { registerService } from "@/requests/auth";
import { showToast } from "@/utils/commonFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Signup = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [valid, setValid] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
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
            let response = await registerService(formData);
            if (response?.data?.success) {
                showToast('Sign up successfully', true);
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
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" value={formData.name}
                                    onChange={(e: any) => changeHandler("name", e.target.value)} placeholder="Lorem Ipsum" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" value={formData.email}
                                    onChange={(e: any) => changeHandler("email", e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" value={formData.password}
                                    onChange={(e: any) => changeHandler("password", e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            {
                                error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline text-sm">{error}</span>
                                    </div>
                                )
                            }
                            <ButtonComponent loading={loader} onClick={submitHandler} disabled={!valid} text="Sign up" />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account yet? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup;