import styles from '@styles/home.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Home: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="description" content="Time tracker application" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <span>
                    {/* <Image
            src="/images/Logo-Icon.png"
            alt="Time Tracker Logo"
            className={styles.vercelLogo}
            width={125}
            height={125}
            priority
          /> */}
                    <h1>Welcome!</h1>
                </span>

                <div className={styles.description}>
                    <p>
                        This will be our main page, in the future, it remains empty for now. We make
                        use of a of fake database, values or things stored will not be permanent.
                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;
export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};
