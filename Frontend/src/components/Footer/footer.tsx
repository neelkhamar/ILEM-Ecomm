"use client"

import React from "react";
import SocialsList1 from "../SocialsList1/SocialsList1";

export interface WidgetFooterMenu {
    id: string;
    title: string;
    menus: any[];
    socialMedia?: boolean;
}

const widgetMenus: WidgetFooterMenu[] = [
    {
        id: "5",
        title: "INVESTORS",
        menus: [
            { href: "/", label: "My Home" },
            { href: "/", label: "Small Cap Marketplace" },
            { href: "/", label: "Request New Hub" },
            { href: "/", label: "Quick Tips" },
            { href: "/", label: "Ratings & Rankings" },
        ],
    },
    {
        id: "1",
        title: "COMPANIES",
        menus: [
            { href: "/", label: "Investor Relations" },
            { href: "/", label: "Success Stories" },
            { href: "/", label: "Testimonials" },
            { href: "/", label: "Contact" },
        ],
    },
    {
        id: "2",
        title: "RESOURCES",
        menus: [
            { href: "/", label: "About Us" },
            { href: "/", label: "Blogs", isExternal: true },
            { href: "/", label: "Rules" },
            { href: "/", label: "Privacy Policy" },
            { href: "/", label: "Terms and Conditions" },
        ],
    },
];

const Footer: React.FC = () => {

    const navigate = (url: any) => {
        window.open(url, '_blank');
        return null;
    }

    const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
        return (
            <div key={index} className="text-sm">
                <h2 className="font-semibold  dark:text-neutral-200">
                    {menu.title}
                </h2>
                {
                    menu.menus.length > 0 ? (
                        <ul className="mt-5 space-y-4">
                            {menu.menus.map((item: any, index: any) => (
                                <li key={index}>
                                    {
                                        item?.isExternal ? (
                                            <span
                                                key={index}
                                                className=" dark:text-neutral-300 hover:text-black cursor-pointer dark:hover:text-white"
                                                onClick={() => navigate(item.href)}
                                            >
                                                {item.label}
                                            </span>
                                        ) : (
                                            <a
                                                key={index}
                                                className=" dark:text-neutral-300 hover:text-black dark:hover:text-white"
                                                href={item.href}
                                            >
                                                {item.label}
                                            </a>
                                        )
                                    }
                                </li>
                            ))}
                        </ul>
                    ) : <></>
                }
                {
                    // console.log(menu.socialMedia)
                    menu.socialMedia ? (
                        <div className="col-span-2 flex items-center md:col-span-3 mt-5">
                            <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
                        </div>
                    ) : <></>
                }
            </div>
        );
    };

    return (
        <div>
            <div className="nc-Footer relative bg-white flex justify-center text-black py-16 lg:py-16 border-t border-neutral-200 dark:border-neutral-700">
                <div className="container flex flex-row max-lg:flex-col gap-y-10 gap-x-5 sm:gap-x-8 lg:gap-x-10 lg:px-0 px-8">
                    <div className="grid grid-cols-2 gap-5 w-1/2 max-lg:w-full col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col sm:xs:flex-row">
                        <div className="col-span-2 md:col-span-2">
                            <div className="hidden md:flex items-center">
                                <img className="h-8 mr-2" src="/images/logo.png" alt="Flipkart Logo" />
                                <span className="text-xl font-bold ml-1">Flipkart</span>
                            </div>
                        </div>
                        <div className="col-span-2 items-center md:col-span-2 lg:w-3/4">
                            <p className=" text-[0.85rem] dark:text-neutral-100 text-justify">
                                Flipkart is the Web 2.0 online marketplace and forum for citizens to buy branded products.
                                People communicate in a monitored and secure environment free of trolling and general nonsense.
                            </p>
                            <p className=" text-[0.85rem] font-semibold dark:text-neutral-100 text-left lg:mt-6 mt-4">© 2024 Flipkart, All right reserved.</p>
                        </div>
                        <SocialsList1 className="flex gap-4 items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-row lg:space-y-2.5 " />

                    </div>
                    <div className="grid grid-cols-3 max-md:grid-cols-2 gap-y-10 gap-x-5  w-1/2 max-lg:w-full">
                        {widgetMenus.map(renderWidgetMenuItem)}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Footer;
