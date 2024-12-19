import Header from '@components/shared/Navigation';
import Head from 'next/head';
import React, { ReactNode, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: ReactNode;
    titleContent?: ReactNode;
    title: string;
    description: string;
    isLoading?: boolean;
};

const MainLayout: React.FC<Props> = ({
    children,
    titleContent,
    title,
    description,
    isLoading = false,
}: Props) => {
    useEffect(() => {
        const authErrorToast = sessionStorage.getItem('authError');
        if (authErrorToast) {
            toast.error(authErrorToast);
            sessionStorage.removeItem('authError');
        }
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="main">
                <div className="main-div-container">
                    <div className="main-head-container">
                        <div className="main-title-container">
                            <div className="main-title">
                                <h1>{title}</h1>
                            </div>
                            {!isLoading && titleContent && (
                                <div className="main-title-extra">{titleContent}</div>
                            )}
                        </div>
                    </div>
                    {!isLoading ? (
                        <div className="main-inner-container">{children}</div>
                    ) : (
                        <div className="spinner-container">
                            <ClipLoader
                                size={200}
                                color={'#0d6efd'}
                                cssOverride={{
                                    borderWidth: '6px',
                                }}
                            />
                        </div>
                    )}
                </div>
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
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
};

export default MainLayout;
