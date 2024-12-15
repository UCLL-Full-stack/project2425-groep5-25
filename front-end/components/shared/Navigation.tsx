import handleTokenInfo from 'hooks/handleTokenInfo';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Language from '../language/Language';

const Header: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();

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
                <div className="flex items-center space-x-2">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-gray-400 hover:text-white transition duration-300">
                        {t('appName')}
                    </Link>
                    {userRole && (
                        <span className="text-white text-lg font-medium">
                            ({userRole === 'admin' ? 'Admin' : userRole === 'hr' ? 'HR' : ''})
                        </span>
                    )}
                </div>

                <nav className="flex space-x-6">
                    <Link
                        href="/"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/' ? 'border-b-2 border-white' : ''
                        }`}>
                        {t('components.navigation.home')}
                    </Link>
                    <Link
                        href="/projects"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/projects' ? 'border-b-2 border-white' : ''
                        }`}>
                        {t('components.navigation.projects')}
                    </Link>
                    <Link
                        href="/workdays"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/workdays' ? 'border-b-2 border-white' : ''
                        }`}>
                        {t('components.navigation.workDays')}
                    </Link>
                    {userRole ? (
                        <button
                            onClick={handleLogout}
                            className="text-white text-lg font-medium hover:underline">
                            {t('components.navigation.logout')}
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={`text-white text-lg font-medium ${
                                    router.pathname === '/login' ? 'border-b-2 border-white' : ''
                                }`}>
                                {t('components.navigation.login')}
                            </Link>
                            <Link
                                href="/signup"
                                className={`text-white text-lg font-medium ${
                                    router.pathname === '/signup' ? 'border-b-2 border-white' : ''
                                }`}>
                                {t('components.navigation.signUp')}
                            </Link>
                        </>
                    )}
                </nav>
                <Language />
            </header>
        </>
    );
};

export default Header;
