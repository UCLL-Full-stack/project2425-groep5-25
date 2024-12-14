import userTokenInfo from 'hooks/userTokenInfo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
    const router = useRouter();
    const { userRole, userName, userFullName, userToken } = userTokenInfo();

    const handleLogout = () => {
        localStorage.clear();

        toast.success(`You are being logged out! Redirecting you...`);

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
                        Home
                    </Link>
                    <Link
                        href="/projects"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/projects' ? 'border-b-2 border-white' : ''
                        }`}>
                        Projects
                    </Link>
                    <Link
                        href="/workdays"
                        className={`text-white text-lg font-medium ${
                            router.pathname === '/workdays' ? 'border-b-2 border-white' : ''
                        }`}>
                        Workdays
                    </Link>
                    {userRole ? (
                        <button
                            onClick={handleLogout}
                            className="text-white text-lg font-medium hover:underline">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={`text-white text-lg font-medium ${
                                    router.pathname === '/login' ? 'border-b-2 border-white' : ''
                                }`}>
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className={`text-white text-lg font-medium ${
                                    router.pathname === '/signup' ? 'border-b-2 border-white' : ''
                                }`}>
                                Signup
                            </Link>
                        </>
                    )}
                </nav>
                <Link
                    href="/"
                    className="text-2xl font-bold text-gray-400 hover:text-white transition duration-300">
                    Time Tracker
                </Link>
            </header>
        </>
    );
};

export default Header;
