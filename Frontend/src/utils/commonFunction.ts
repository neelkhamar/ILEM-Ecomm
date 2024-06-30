import { toast } from "react-toastify";

export const showToast = (message: any, success = true) => {
    if (success) {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    } else {
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

export const getQueryParams = (url: string, req: any) => {
    return `${url}?${Object.entries(req).map(k => k.join("=")).join('&')}`
}