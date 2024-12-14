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
    const selectedOption = options.find((option) => option.value === locale) || options[0];

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
                value={selectedOption || null} // Ensure a fallback value of null
                onChange={handleLanguageChange}
                className="text-black"
                classNamePrefix="react-select"
                isSearchable={false} // Set to true if you want to allow searching
            />
        </>
    );
};

export default Language;
