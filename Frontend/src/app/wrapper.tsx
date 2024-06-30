"use client";

import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/ConfigureStore";
import { PersistGate } from "redux-persist/integration/react";

export default function WrapperClass({ children }: any) {

    return (
        <div className="w-full">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Header />
                    {children}
                    <Footer />
                </PersistGate>
            </Provider>
        </div>
    )
}