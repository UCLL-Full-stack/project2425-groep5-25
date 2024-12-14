import userTokenInfo from 'hooks/userTokenInfo';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Language from './language/Language';

const Header: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { userRole, userName, userFullName, userToken } = userTokenInfo();

    const handleLogout = () => {
        localStorage.clear();

        toast.success(t('header.logoutSuccess'));

        setTimeout(() => {
            router.push('/login');
        }, 2750);
    };

    return (
        <>
            <header className="flex justify-between items-center p-4 border-b bg-gray-800">
                <nav className="flex space-x-6">
                    <Link
                        href="/"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/' ? 'border-b-2 border-white' : ''
                        }`}>
                        {t('header.home')}
                    </Link>
                    <Link
                        href="/projects"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/projects' ? 'border-b-2 border-white' : ''
                        }`}>
                        {t('header.projects')}
                    </Link>
                    <Link
                        href="/workdays"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/workdays' ? 'border-b-2 border-white' : ''
                        }`}>
                        {t('header.workdays')}
                    </Link>
                    {userRole ? (
                        <button
                            onClick={handleLogout}
                            className="text-white text-lg font-medium hover:underline">
                            {t('header.logout')}
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={`text-white text-lg font-medium ${
                                    router.pathname === '/login' ? 'border-b-2 border-white' : ''
                                }`}>
                                {t('header.login')}
                            </Link>
                            <Link
                                href="/signup"
                                className={`text-white text-lg font-medium ${
                                    router.pathname === '/signup' ? 'border-b-2 border-white' : ''
                                }`}>
                                {t('header.signup')}
                            </Link>
                        </>
                    )}
                    <Language></Language>
                </nav>
                <Link
                    href="/"
                    className="text-2xl font-bold text-gray-400 hover:text-white transition duration-300">
                    {t('header.title')}
                </Link>
            </header>
        </>
    );
};

export default Header;
