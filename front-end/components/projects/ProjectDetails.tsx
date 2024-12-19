import ErrorMessage from '@components/layout/ErrorMessage';
import Button from '@components/shared/Button';
import ColorSelectField from '@components/shared/ColorSelectField';
import InputField from '@components/shared/InputField';
import UserSelectField from '@components/shared/UserSelectField';
import { Color, ErrorLabelMessage, IdName, ProjectInput, ProjectOutput } from '@types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getColorEnumFromHex } from 'utils/colorUtils';

type Props = {
    userIdNames: Array<IdName>;
    project: ProjectOutput;
    onSubmit: (data: ProjectInput) => void;
    clearParentErrors: () => void;
};

const ProjectDetails: React.FC<Props> = ({
    userIdNames,
    project,
    onSubmit,
    clearParentErrors,
}: Props) => {
    const { t } = useTranslation();
    const [name, setName] = useState<string | null>(null);
    const [color, setColor] = useState<Color | null>(null);
    const [userIds, setUserIds] = useState<number[]>([]);
    const [showUserSelector, setShowUserSelector] = useState<boolean>(false);
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const validateName = (name: string | null) => {
        if (!name?.trim()) return t('components.projectDetails.validate.name.required');
        if (name.trim().length < 6) return t('components.projectDetails.validate.name.minLength');
        if (!/^[a-zA-Z0-9 ]+$/.test(name))
            return t('components.projectDetails.validate.name.invalid');
        return null;
    };

    const validateColor = (color: Color | null) => {
        if (!color?.trim()) return t('components.projectDetails.validate.color.required');
        if (!Object.values(Color).includes(color))
            return t('components.projectDetails.validate.color.invalid');
        return null;
    };

    const validateUserSelection = (value: number[]) => {
        const uniqueUserIds = new Set(value);
        if (uniqueUserIds.size !== value.length)
            return t('components.projectDetails.validate.users.unique');
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        const nameError = validateName(name);
        const colorError = validateColor(color);

        if (nameError || colorError) {
            setErrorLabelMessage({
                label: t('error.unexpectedErrorLabel'),
                message: nameError || colorError || t('error.unexpectedErrorMessage'),
            });
            return false;
        }

        return valid;
    };

    const clearAllErrors = () => {
        clearParentErrors();
        setErrorLabelMessage(undefined);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearAllErrors();

        if (!validate()) {
            return;
        }

        const projectData: ProjectInput = {
            id: project.id,
            name: name!,
            color: color!,
            userIds,
        };

        onSubmit(projectData);
    };

    useEffect(() => {
        setName(project.name);
        setColor(getColorEnumFromHex(project.color));
        setUserIds(project.users?.map((user) => user.id ?? 0) || []);
    }, []);

    return (
        <>
            {project && userIdNames && (
                <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl border shadow-md border-gray-300">
                    <div className="text-center">
                        <h6 className="text-xl font-semibold text-gray-700 mb-6">
                            {t('components.projectDetails.title')}
                        </h6>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <InputField
                            type="text"
                            label={t('components.projectDetails.labels.name')}
                            value={name}
                            onChange={setName}
                            validate={validateName}
                            placeholder={t('components.projectDetails.placeholders.name')}
                            required
                        />

                        <ColorSelectField
                            label={t('components.projectDetails.labels.color')}
                            value={color}
                            onChange={setColor}
                            validate={validateColor}
                            placeholder={t('components.projectDetails.placeholders.color')}
                            required
                        />

                        {!showUserSelector ? (
                            <Button
                                label={t('components.projectSidePanel.buttons.addUsers')}
                                onClick={() => setShowUserSelector(true)}
                            />
                        ) : (
                            <UserSelectField
                                label={t('components.projectDetails.labels.users')}
                                userIdNames={userIdNames}
                                value={userIds}
                                onChange={setUserIds}
                                validate={validateUserSelection}
                                placeholder={t('components.projectDetails.placeholders.users')}
                                required={false}
                            />
                        )}

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                            {t('components.projectDetails.buttons.updateProject')}
                        </button>

                        {errorLabelMessage && (
                            <ErrorMessage errorLabelMessage={errorLabelMessage} />
                        )}
                    </form>
                </div>
            )}
        </>
    );
};

export default ProjectDetails;
