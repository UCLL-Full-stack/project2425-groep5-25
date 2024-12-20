import MainLayout from '@components/layout/MainLayout';
import handleTokenInfo from '@hooks/handleTokenInfo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();

    const customUsers = [
        {
            firstName: 'Roel',
            lastName: 'Crabbé',
            userName: 'Roel_Crabbe',
            email: 'roel.crabbe@example.com',
            password: '@Roel_Crabbe123',
            role: 'admin',
        },
        {
            firstName: 'Yasir',
            lastName: 'Hozan',
            userName: 'Yasir_Hozan',
            email: 'yasir.hozan@example.com',
            password: '@Yasir_Hozan123',
            role: 'hr',
        },
        {
            firstName: 'Johan',
            lastName: 'Pieck',
            userName: 'Johan_Pieck',
            email: 'johan.pieck@example.com',
            password: '@Johan_Pieck123',
            role: 'user',
        },
    ];

    return (
        <MainLayout title={t('pages.home.title')} description={t('pages.home.description')}>
            <div className="flex justify-center w-full py-6">
                <div className="flex flex-col gap-4 max-w-2xl text-center w-full">
                    {userRole ? (
                        <>
                            <h2>{t('pages.home.welcome') + userFullName}</h2>
                            <p className="text-lg text-gray-700">{t('pages.home.message')}</p>
                        </>
                    ) : (
                        <div className="flex flex-col gap-8 items-center justify-center">
                            <h2 className="text-xl font-semibold">{t('pages.home.table.title')}</h2>
                            <table className="table-container">
                                <thead className="table-header">
                                    <tr>
                                        <th scope="col">{t('pages.home.table.userName')}</th>
                                        <th scope="col">{t('pages.home.table.passWord')}</th>
                                        <th scope="col">{t('pages.home.table.role')}</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {customUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td className="border-r">{user.userName}</td>
                                            <td className="border-r">{user.password}</td>
                                            <td>{t('roles.' + user.role)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default Home;
