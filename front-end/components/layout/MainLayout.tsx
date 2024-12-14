import Head from 'next/head';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    title: string;
    description: string;
};

const MainLayout: React.FC<Props> = ({ children, title, description }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </>
    );
};

export default MainLayout;
