"use client";

import { cartInfo, updateProductToCart } from '@/requests/product';
// components/Cart.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemPage from './item';
import Link from 'next/link';
import { setCart } from '@/redux/User/Action';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [loader, setLoader] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const { currentUser } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser
        };
    });

    useEffect(() => {
        if (!currentUser) {
            router.push('/login')
        }
        fetchCartInfo()
    }, [])

    const fetchCartInfo = async () => {
        try {
            setLoader(true)
            let result = await cartInfo(currentUser?._id);
            if (result?.data?.success) {
                setCartItems(result?.data?.data);
                dispatch(setCart(result?.data?.data?.length))
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    }

    // Function to remove item from cart
    const updateCart = async (cartId: any, productId: any, quantity: any) => {
        try {
            setLoader(true)
            let payload = {
                user: currentUser?._id,
                product: productId,
                quantity: quantity
            }
            let result = await updateProductToCart(cartId, payload);
            if (result?.data?.success) {
                fetchCartInfo();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    };

    // Calculate total price of items in cart
    const totalPrice = cartItems.reduce((total: any, item: any) => total + (item?.productInfo?.[0]?.price * item.quantity), 0);

    return (
        <div className="container mx-auto px-4 mt-8">
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        {
                            loader ? (
                                <div className='w-full flex justify-center'>
                                    <div className="loader-custom-blue"></div>
                                </div>
                            ) : (
                                <div>
                                    {
                                        cartItems?.length > 0 ? cartItems?.map((item: any, index: any) => {
                                            return (
                                                <ItemPage item={item} key={index} updateCart={updateCart} />
                                            )
                                        }) : (
                                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"></div>
                                        )
                                    }
                                </div>
                            )
                        }


                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                <div className="space-y-4">
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">${totalPrice}</dd>
                                    </dl>
                                </div>

                                <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                    <Link href="/products" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                        Continue Shopping
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CartPage;
