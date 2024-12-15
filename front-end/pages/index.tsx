import MainLayout from '@components/layout/MainLayout';
import handleTokenInfo from 'hooks/handleTokenInfo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();

    return (
        <MainLayout title={t('pages.home.title')} description={t('pages.home.description')}>
            <div className="flex justify-center w-full py-6">
                <div className="text-center max-w-3xl w-full">
                    <p className="text-lg text-gray-700">{t('pages.home.message')}</p>
                </div>
            </div>
        </MainLayout>
    );
};

export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default Home;
