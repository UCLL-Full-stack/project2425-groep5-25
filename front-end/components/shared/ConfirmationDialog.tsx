import { useTranslation } from 'react-i18next';

type Props = {
    label: string;
    onDelete: () => void;
    onClose: () => void;
};

const ConfirmationDialog: React.FC<Props> = ({ label, onDelete, onClose }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="confirmation-dialog-wrapper" onClick={onClose}>
                <div
                    className="detail-container flex flex-col gap-8"
                    onClick={(e) => e.stopPropagation()}>
                    <h1>{label}</h1>
                    <div className="flex justify-between gap-16 px-12">
                        <button
                            className="w-full py-2 px-4 rounded-lg shadow-md text-white transition duration-100 bg-green-500 hover:bg-green-400"
                            onClick={onDelete}>
                            {t('buttons.yes')}
                        </button>
                        <button
                            className="w-full py-2 px-4 rounded-lg shadow-md text-white transition duration-100 bg-red-500 hover:bg-red-400"
                            onClick={onClose}>
                            {t('buttons.no')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;
