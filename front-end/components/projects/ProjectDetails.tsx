import ErrorMessage from '@components/layout/ErrorMessage';
import Button from '@components/shared/Button';
import ColorSelectField from '@components/shared/ColorSelectField';
import InputField from '@components/shared/InputField';
import UserSelectField from '@components/shared/UserSelectField';
import { Color, ErrorLabelMessage, IdName, ProjectInput, ProjectOutput } from '@types';
import { getColorEnumFromHex } from '@utils/colorUtils';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    userIdNames: Array<IdName>;
    project: ProjectOutput;
    onSubmit: (data: ProjectInput) => void;
    clearParentErrors: () => void;
    children: ReactNode;
};

const ProjectDetails: React.FC<Props> = ({
    userIdNames,
    project,
    onSubmit,
    clearParentErrors,
    children,
}: Props) => {
    const { t } = useTranslation();
    const [name, setName] = useState<string | null>(null);
    const [color, setColor] = useState<Color | null>(null);
    const [userIds, setUserIds] = useState<number[]>([]);
    const [showUserSelector, setShowUserSelector] = useState<boolean>(false);
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

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

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 2000);

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
    }, [project, userIdNames]);

    return (
        <>
            {project && userIdNames && (
                <div className="detail-container">
                    <div className="text-center">
                        <h2 className="mb-6">{t('components.projectDetails.title')}</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="form-container">
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

                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            isLoading={isButtonDisabled}
                            isDisabled={isButtonDisabled}
                            label={
                                isButtonDisabled
                                    ? t('components.timeBlockSideForm.processing')
                                    : t('components.projectDetails.buttons.updateProject')
                            }
                        />

                        {errorLabelMessage && (
                            <ErrorMessage errorLabelMessage={errorLabelMessage} />
                        )}

                        {children}
                    </form>
                </div>
            )}
        </>
    );
};

export default ProjectDetails;
