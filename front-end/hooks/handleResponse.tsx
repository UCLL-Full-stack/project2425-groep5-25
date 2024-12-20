import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const handleResponse = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleUnauthorized = async (response?: Response) => {
        if (!response || response.ok) return null;

        if (response.status === 403) {
            console.error(`Forbidden error: ${response.status}`);
            sessionStorage.setItem('authError', t('error.forbidden'));
            router.push('/login');
            return null;
        } else if (response.status === 401) {
            console.error(`Authentication error: ${response.status}`);
            sessionStorage.setItem('authError', t('error.unauthorized'));
            router.push('/');
            return null;
        }
    };

    return { handleUnauthorized };
};

export default handleResponse;
