import { useRouter } from 'next/router';
import Select, { SingleValue } from 'react-select';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale } = router;

    const options = [
        { value: 'en', label: 'English' },
        { value: 'tr', label: 'Türkçe' },
        { value: 'nl', label: 'Nederlands' },
    ];

    const handleLanguageChange = (
        selectedOption: SingleValue<{ value: string; label: string }>,
    ) => {
        if (selectedOption) {
            const newLocale = selectedOption.value;
            const { pathname, asPath, query } = router;
            router.push({ pathname, query }, asPath, { locale: newLocale });
        }
    };

    return (
        <>
            <Select
                id="language"
                options={options}
                value={options.find((option) => option.value === locale) || options[0]}
                onChange={handleLanguageChange}
                className="text-black"
                isSearchable={false}
            />
        </>
    );
};

export default Language;
