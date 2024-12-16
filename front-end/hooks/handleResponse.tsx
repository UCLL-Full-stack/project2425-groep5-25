import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const handleResponse = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleApiResponse = async (response: Response) => {
        if (response.ok) return await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                console.error(`Forbidden error: ${response.status}`);
                sessionStorage.setItem('authError', t('error.forbidden'));
                router.push('/');
                return null;
            } else if (response.status === 401) {
                console.error(`Authentication error: ${response.status}`);
                sessionStorage.setItem('authError', t('error.unauthorized'));
                router.push('/login');
                return null;
            }
        }
    };

    return { handleApiResponse };
};

export default handleResponse;
