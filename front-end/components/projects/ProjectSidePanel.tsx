import ErrorMessage from '@components/layout/ErrorMessage';
import Button from '@components/shared/Button';
import ColorSelectField from '@components/shared/ColorSelectField';
import InputField from '@components/shared/InputField';
import UserSelectField from '@components/shared/UserSelectField';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { projectService } from '@services/projectService';
import { Color, ErrorLabelMessage, IdName, ProjectInput } from '@types';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    userIdNames: Array<IdName>;
    onProjectCreated: () => void;
    onClose: () => void;
};

const ProjectSidePanel: React.FC<Props> = ({ userIdNames, onProjectCreated, onClose }: Props) => {
    const { t } = useTranslation();

    const [name, setName] = useState<string | null>(null);
    const [color, setColor] = useState<Color | null>(null);
    const [userIds, setUserIds] = useState<number[]>([]);
    const [showUserSelector, setShowUserSelector] = useState<boolean>(false);
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const validateName = (name: string | null) => {
        if (!name?.trim()) return t('components.projectSidePanel.validate.name.required');
        if (name.trim().length < 6) return t('components.projectSidePanel.validate.name.minLength');
        if (name.trim().length > 15)
            return t('components.projectSidePanel.validate.name.maxLength');
        if (!/^[a-zA-Z0-9 ]+$/.test(name))
            return t('components.projectSidePanel.validate.name.invalid');
        return null;
    };

    const validateColor = (color: Color | null) => {
        if (!color?.trim()) return t('components.projectSidePanel.validate.color.required');
        if (!Object.values(Color).includes(color))
            return t('components.projectSidePanel.validate.color.invalid');
        return null;
    };

    const validateUserSelection = (value: number[]) => {
        const uniqueUserIds = new Set(value);
        if (uniqueUserIds.size !== value.length)
            return t('components.projectSidePanel.validate.users.unique');
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        const nameError = validateName(name);
        const colorError = validateColor(color);
        const userError = showUserSelector ? validateUserSelection(userIds) : null;

        if (nameError || colorError || userError) {
            setErrorLabelMessage({
                label: t('error.unexpectedErrorLabel'),
                message: nameError || colorError || userError || t('error.unexpectedErrorMessage'),
            });
            return false;
        }

        return valid;
    };

    const createProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorLabelMessage(undefined);

        if (!validate()) {
            return;
        }

        try {
            const formData: ProjectInput = { name: name!, color: color!, userIds };
            const [projectResponse] = await Promise.all([projectService.createProject(formData)]);
            const [projectJson] = await Promise.all([projectResponse.json()]);

            if (!projectResponse.ok)
                throw new Error(projectJson.message || t('error.unexpectedErrorMessage'));

            onProjectCreated();
            toast.success(t('components.projectSidePanel.toast.success'));
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: error.message || t('error.unexpectedErrorMessage'),
                });
            }
        }
    };

    return (
        <>
            <div className="side-panel-container">
                <div>
                    <h2>{t('components.projectSidePanel.title')}</h2>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <form onSubmit={createProject} className="form-container">
                    <InputField
                        type="text"
                        label={t('components.projectSidePanel.labels.name')}
                        value={name}
                        onChange={setName}
                        validate={validateName}
                        placeholder={t('components.projectSidePanel.placeholders.name')}
                        required
                    />

                    <ColorSelectField
                        label={t('components.projectSidePanel.labels.color')}
                        value={color}
                        onChange={setColor}
                        validate={validateColor}
                        placeholder={t('components.projectSidePanel.placeholders.color')}
                        required
                    />

                    {!showUserSelector ? (
                        <Button
                            type="button"
                            label={t('components.projectSidePanel.buttons.addUsers')}
                            onClick={() => setShowUserSelector(true)}
                        />
                    ) : (
                        <UserSelectField
                            label={t('components.projectSidePanel.labels.users')}
                            userIdNames={userIdNames}
                            value={userIds}
                            onChange={setUserIds}
                            validate={validateUserSelection}
                            placeholder={t('components.projectSidePanel.placeholders.users')}
                            required={false}
                        />
                    )}

                    <Button
                        type="submit"
                        label={t('components.projectSidePanel.buttons.createProject')}
                        onClick={createProject}
                    />

                    {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
                </form>
            </div>
        </>
    );
};

export default ProjectSidePanel;
