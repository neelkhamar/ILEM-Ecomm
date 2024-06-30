import { setCart } from "@/redux/User/Action";
import { addProductToCart } from "@/requests/product";
import { showToast } from "@/utils/commonFunction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// components/ProductCard.js
const ProductCard = ({ item, createToast }: any) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [addToCart, setAddToCart] = useState(false);

    const { currentUser } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser
        };
    });

    const handleAddToCart = () => {
        if (addToCart) {
            router.push('/cart');
        } else {
            addInCart()
        }
    }

    useEffect(() => {
        setAddToCart(item?.cart);
    }, [])

    const addInCart = async () => {
        try {
            let payload = {
                product: item?._id,
                quantity: 1
            }
            let resp = await addProductToCart(currentUser?._id, payload);
            if (resp?.data?.success) {
                setAddToCart(true);
                createToast("Product added to cart!")
                dispatch(setCart(resp?.data?.total))
            }
        } catch (Err) {
            console.log(Err);
        } finally {

        }
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image width={400} height={300} loading="lazy" className="w-full h-[320px] object-contain" src={item?.url || "https://via.placeholder.com/300"} alt="Product" />
            <div className="p-3">
                <div>
                    <div className="flex justify-between">
                        <div className="font-semibold text-base">{item?.title}</div>
                    </div>
                    <div className="">
                        <span className="text-gray-700 text-sm">${item?.price}</span>
                    </div>
                </div>
                <div className="mt-2 bottom-0">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded" onClick={handleAddToCart}>
                        {addToCart ? 'Go to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
