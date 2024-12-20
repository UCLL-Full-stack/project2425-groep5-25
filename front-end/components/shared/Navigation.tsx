import Language from '@components/language/Language';
import handleTokenInfo from 'hooks/handleTokenInfo';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();

    const handleLogout = () => {
        localStorage.clear();

        toast.success(t('components.navigation.logoutSuccess'));

        setTimeout(() => {
            router.push('/');
        }, 2000);
    };

    return (
        <>
            <header className="header-container">
                <div className="header-name-container">
                    <Link href="/" className="header-name-link">
                        {t('appName')}
                    </Link>
                    {userRole && (userRole === 'admin' || userRole === 'hr') && (
                        <span className="header-user-role">({t('roles.' + userRole)})</span>
                    )}
                </div>

                <div className="header-center-container">
                    <nav className="header-nav">
                        <Link
                            href="/"
                            className={`header-nav-link ${
                                router.pathname === '/' ? 'link-active' : ''
                            }`}>
                            {t('components.navigation.home')}
                        </Link>
                        <Link
                            href="/projects"
                            className={`header-nav-link ${
                                router.pathname === '/projects' ? 'link-active' : ''
                            }`}>
                            {t('components.navigation.projects')}
                        </Link>
                        <Link
                            href="/workdays"
                            className={`header-nav-link ${
                                router.pathname === '/workdays' ? 'link-active' : ''
                            }`}>
                            {t('components.navigation.workDays')}
                        </Link>
                        {userRole ? (
                            <button onClick={handleLogout} className="header-logout-button">
                                {t('components.navigation.logout')}
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`header-nav-link ${
                                        router.pathname === '/login' ? 'link-active' : ''
                                    }`}>
                                    {t('components.navigation.login')}
                                </Link>
                                <Link
                                    href="/signup"
                                    className={`header-nav-link ${
                                        router.pathname === '/signup' ? 'link-active' : ''
                                    }`}>
                                    {t('components.navigation.signUp')}
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                <div className="header-language-container">
                    <Language />
                </div>
            </header>
        </>
    );
};

export default Header;
