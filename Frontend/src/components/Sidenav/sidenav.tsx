"use client";

import { setMenu, setSearch } from "@/redux/User/Action";
import { leftMenuService } from "@/requests/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidenav = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const categories = [
        {
            name: 'Electronics',
            subcategories: ['Mobiles', 'Laptops', 'Cameras'],
        },
        {
            name: 'Clothing',
            subcategories: ['Men', 'Women', 'Kids'],
        },
        {
            name: 'Home & Furniture',
            subcategories: ['Kitchen', 'Bedroom', 'Living Room'],
        },
    ];

    const { menuItems } = useSelector((state: any) => {
        return {
            menuItems: state.auth.menuItems,
        };
    });

    useEffect(() => {
        if (!menuItems?.length) {
            fetchMenuItems()
        }
    }, [])

    const fetchMenuItems = async () => {
        try {
            let result = await leftMenuService();
            if (result?.data?.success) {
                dispatch(setMenu(result?.data?.data))
            }
        } catch (err) {
            console.log("Something went wrong");
        }
    }

    const handleNavigate = (item: any) => {
        dispatch(setSearch(item));
        router.push(`/products?search=${item}`);
    }

    return (
        <div className={`lg:relative lg:block absolute hidden min-h-full text-white w-64 overflow-y-auto border-r-[1px] transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4">
                <h2 className="text-xl text-gray-900 font-semibold mb-4">Categories</h2>
                <hr />
                <ul className="mt-4">
                    {menuItems?.map((category: any, index: any) => (
                        <li key={index} className="mb-4">
                            <h3 className="text-blue-600 mb-2 font-semibold">{category?.name}</h3>
                            <ul>
                                {category?.children?.map((subcategory: any, subIndex: any) => (
                                    <li key={subIndex} className="cursor-pointer">
                                        <span onClick={() => handleNavigate(subcategory)} className="text-gray-800 hover:text-blue-600">{subcategory}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidenav;