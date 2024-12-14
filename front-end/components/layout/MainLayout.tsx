import Header from '@components/shared/Headers';
import styles from '@styles/MainLayout.module.css';
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
    isLoading,
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
            <main className={styles.main}>
                <div className={styles['main-container']}>
                    <div className={styles['main-title-container']}>
                        <h1>{title}</h1>
                        {titleContent}
                    </div>
                    <hr />
                    {isLoading ? (
                        <div className={styles['spinner-container']}>
                            <ClipLoader
                                size={200}
                                color={'#0d6efd'}
                                cssOverride={{
                                    borderWidth: '6px',
                                }}
                            />
                        </div>
                    ) : (
                        <div className={styles['main-inner-container']}>{children}</div>
                    )}
                </div>
            </main>
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
};

export default MainLayout;
