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
        }, 3000);
    };

    return (
        <header className="d-flex justify-content-between p-3 border-bottom bg-dark bg-gradient">
            <nav className="nav justify-content-center">
                <Link
                    href="/"
                    className={`nav-link px-4 fs-5 text-white ${
                        router.pathname === '/' ? 'border-bottom' : ''
                    }`}>
                    {t('header.home')}
                </Link>
                <Link
                    href="/projects"
                    className={`nav-link px-4 fs-5 text-white ${
                        router.pathname === '/projects' ? 'border-bottom' : ''
                    }`}>
                    {t('header.projects')}
                </Link>
                <Link
                    href="/workdays"
                    className={`nav-link px-4 fs-5 text-white ${
                        router.pathname === '/workdays' ? 'border-bottom' : ''
                    }`}>
                    {t('header.workdays')}
                </Link>
                {userRole ? (
                    <a
                        role="button"
                        onClick={handleLogout}
                        className="nav-link px-4 fs-5 text-white">
                        {t('header.logout')}
                    </a>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className={`nav-link px-4 fs-5 text-white ${
                                router.pathname === '/login' ? 'border-bottom' : ''
                            }`}>
                            {t('header.login')}
                        </Link>
                        <Link
                            href="/signup"
                            className={`nav-link px-4 fs-5 text-white ${
                                router.pathname === '/signup' ? 'border-bottom' : ''
                            }`}>
                            {t('header.signup')}
                        </Link>
                    </>
                )}
                <Language></Language>
            </nav>
            <Link
                className="fs-2 d-flex justify-content-center text-white-50 text-decoration-none"
                href="/">
                {t('header.title')}
            </Link>
        </header>
    );
};

export default Header;
