import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();

        toast.success(`You are being logged out! Redirecting you...`);

        setTimeout(() => {
            router.push('/login');
        }, 3000);
    };

    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

    return (
        <header className="d-flex justify-content-between p-3 border-bottom bg-dark bg-gradient">
            <nav className="nav justify-content-center">
                <Link
                    href="/"
                    className={`nav-link px-4 fs-5 text-white ${
                        router.pathname === '/' ? 'border-bottom' : ''
                    }`}>
                    Home
                </Link>
                <Link
                    href="/projects"
                    className={`nav-link px-4 fs-5 text-white ${
                        router.pathname === '/projects' ? 'border-bottom' : ''
                    }`}>
                    Projects
                </Link>
                <Link
                    href="/workdays"
                    className={`nav-link px-4 fs-5 text-white ${
                        router.pathname === '/workdays' ? 'border-bottom' : ''
                    }`}>
                    Workdays
                </Link>
                {isLoggedIn ? (
                    <a
                        onClick={handleLogout}
                        className="nav-link px-4 fs-5 text-white cursor-pointer">
                        Logout
                    </a>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className={`nav-link px-4 fs-5 text-white ${
                                router.pathname === '/login' ? 'border-bottom' : ''
                            }`}>
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className={`nav-link px-4 fs-5 text-white ${
                                router.pathname === '/signup' ? 'border-bottom' : ''
                            }`}>
                            Signup
                        </Link>
                    </>
                )}
            </nav>
            <Link
                className="fs-2 d-flex justify-content-center text-white-50 text-decoration-none"
                href="/">
                Time Tracker
            </Link>
        </header>
    );
};

export default Header;
