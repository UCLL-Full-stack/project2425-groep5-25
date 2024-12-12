import Header from '@components/header';
import '@styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const authErrorToast = sessionStorage.getItem('authError');
        if (authErrorToast) {
            toast.error(authErrorToast);
            sessionStorage.removeItem('authError');
        }
    }, []);

    return (
        <>
            <Header />
            <Component {...pageProps} />
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
