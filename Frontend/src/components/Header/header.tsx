"use client";

import { logout, setSearch } from '@/redux/User/Action';
// components/Header.js
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams: any = useSearchParams()
    const [keyword, setKeyword] = useState("");
    const { currentUser, loggedIn, cart } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn,
            cart: state.auth.cart
        };
    });

    useEffect(() => {
        let search = searchParams.get("search");
        let url = searchParams.get('url');
        if (search && url) {
            setKeyword(search);
        } else {
            setKeyword("");
        }
    }, [])

    const logoutUser = () => {
        dispatch(logout())
        router.push('/login');
    }

    const searchHandler = () => {
        let url = `/products`;
        if (keyword) {
            url = `/products?search=${keyword}&url=true`;
            setKeyword(keyword);
        }
        dispatch(setSearch(keyword))
        router.push(url)
    }

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="hidden md:flex items-center text-xl font-bold text-gray-900 dark:text-white">
                        <img className="h-8 mr-3" src="/images/logo.png" alt="Flipkart Logo" />
                        Flipkart
                    </div>
                    {/* Search Bar */}
                    <div className="flex items-center w-[50%] mx-6">
                        <input
                            type="text"
                            className="w-full p-2 pl-4 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Search for products, brands and more"
                            onChange={(e: any) => setKeyword(e.target.value)}
                            value={keyword}
                        />
                        <button onClick={searchHandler} className="bg-yellow-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-yellow-600 focus:outline-none">
                            Search
                        </button>
                    </div>
                    {/* User Icons */}
                    <div className="flex items-center space-x-4">
                        {
                            currentUser ? (
                                <div className='flex'>
                                    <button type="button" onClick={() => router.push('/cart')} className="mr-5 relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96 0-1.11-.9-2-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z" fill="#ffffff" className="fill-000000" /><path d="M0 0h48v48H0z" fill="none" /></svg>
                                        <span className="sr-only">Notifications</span>
                                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cart ?? 0}</div>
                                    </button>

                                    <button onClick={logoutUser} className="text-gray-700 hover:text-black focus:outline-none">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <button className="text-gray-700 hover:text-black focus:outline-none">
                                        Login
                                    </button>
                                </Link>
                            )
                        }

                    </div>
                </div>
            </div >
        </header >
    );
};

export default Header;
