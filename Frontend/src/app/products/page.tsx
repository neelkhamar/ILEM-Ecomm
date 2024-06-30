"use client";

import ProductCard from "@/components/ProductCard/productCard";
import Sidenav from "@/components/Sidenav/sidenav";
import { setSearch } from "@/redux/User/Action";
import { productService } from "@/requests/product";
import { showToast } from "@/utils/commonFunction";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Products = () => {

    const dispatch = useDispatch()
    const searchParams: any = useSearchParams()
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");

    const { searchKeyword, currentUser } = useSelector((state: any) => {
        return {
            searchKeyword: state.auth.searchKeyword,
            currentUser: state.auth.currentUser
        };
    });

    useEffect(() => {
        let search = searchParams.get('search');
        if (!search) {
            dispatch(setSearch(""));
        }
        fetchData(search);
    }, [])

    useEffect(() => {
        if (searchKeyword != keyword) {
            fetchData(searchKeyword);
        }
    }, [searchKeyword])

    const fetchData = async (value: any) => {
        setKeyword(value);
        try {
            setLoader(true);
            let payload: any = {}
            if (value) {
                payload["value"] = value
            }
            let result = await productService(payload, currentUser?._id);
            if (result?.data?.success) {
                setData(result?.data?.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    }

    const createToast = (message: any, isSuccess: any) => {
        showToast(message, isSuccess)
    }

    return (
        <div className="flex min-h-screen overflow-hidden">
            <Sidenav />
            <ToastContainer />
            <div className="bg-[#f8f8f8] w-full p-3">
                {loader ? (
                    <main className="w-full bg-white border-[1px]">
                        <div className="loader-custom"></div>
                    </main>
                ) : (
                    <main className="w-full bg-white border-[1px]">
                        <div className="p-5 border-b-[1px] text-lg font-semibold">
                            Showing {data?.length} results {searchKeyword ? 'for "{keyword}"' : ''}
                        </div>
                        <div className="p-5 grid lg:grid-cols-4 grid-cols-1 gap-5">
                            {
                                data?.map((item: any, index: any) => {
                                    return (
                                        <ProductCard key={index} item={item} createToast={createToast} />
                                    )
                                })
                            }
                        </div>
                    </main>
                )}
            </div>
        </div>
    )
}

export default Products;