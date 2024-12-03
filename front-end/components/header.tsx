import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const router = useRouter();

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
            </nav>
            <a className="fs-2 d-flex justify-content-center text-white-50 text-decoration-none">
                Time Tracker
            </a>
        </header>
    );
};

export default Header;
