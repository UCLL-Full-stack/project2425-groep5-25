import ErrorMessage from '@components/layout/ErrorMessage';
import ColorSelectField from '@components/shared/ColorSelectField';
import InputField from '@components/shared/InputField';
import UserSelectField from '@components/shared/UserSelectField';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { projectService } from '@services/projectService';
import styles from '@styles/ProjectSidePanel.module.css';
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
        if (!name?.trim()) return t('projectSidePanelComponent.validation.nameRequired');
        if (name.trim().length < 6) return t('projectSidePanelComponent.validation.nameLength');
        if (!/^[a-zA-Z0-9 ]+$/.test(name))
            return t('projectSidePanelComponent.validation.nameInvalid');
        return null;
    };

    const validateColor = (color: Color | null) => {
        if (!color?.trim()) return t('projectSidePanelComponent.validation.colorRequired');
        if (!Object.values(Color).includes(color))
            return t('projectSidePanelComponent.validation.invalidColor');
        return null;
    };

    const validateUserSelection = (value: number[]) => {
        const uniqueUserIds = new Set(value);
        if (uniqueUserIds.size !== value.length)
            return t('projectSidePanelComponent.error.uniqueUsers');
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        const nameError = validateName(name);
        const colorError = validateColor(color);
        const userError = showUserSelector ? validateUserSelection(userIds) : null;

        if (nameError || colorError || userError) {
            setErrorLabelMessage({
                label: t('projectSidePanelComponent.error.validationError.label'),
                message: nameError || colorError || userError || '',
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
            const projectFormData: ProjectInput = { name: name!, color: color!, userIds };
            const [projectResponse] = await Promise.all([
                projectService.createProject(projectFormData),
            ]);
            const [projectJson] = await Promise.all([projectResponse.json()]);

            if (!projectResponse.ok)
                throw new Error(
                    projectJson.message || t('projectSidePanelComponent.error.createError'),
                );

            onProjectCreated();
            toast.success(t('projectSidePanelComponent.createSuccess'));
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: t('projectSidePanelComponent.error.validationError.label'),
                    message: error.message,
                });
            }
        }
    };

    return (
        <>
            <div className={styles['side-panel']}>
                <div className={styles['title-container']}>
                    <h6>{t('projectSidePanelComponent.titel')}</h6>
                    <button onClick={onClose} className={styles.closeButton}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <form onSubmit={createProject} className={styles['form-container']}>
                    <InputField
                        type="text"
                        label={t('projectSidePanelComponent.projectName.label')}
                        value={name}
                        onChange={setName}
                        validate={validateName}
                        placeholder={t('projectSidePanelComponent.projectName.placeholder')}
                        required
                    />

                    <ColorSelectField
                        label={t('projectSidePanelComponent.selectColor.label')}
                        value={color}
                        onChange={setColor}
                        validate={validateColor}
                        placeholder={t('projectSidePanelComponent.selectColor.placeholder')}
                        required
                    />

                    {!showUserSelector ? (
                        <button
                            type="button"
                            className={styles.button}
                            onClick={() => setShowUserSelector(true)}>
                            {t('projectSidePanelComponent.addUsersButton')}
                        </button>
                    ) : (
                        <UserSelectField
                            label={t('projectSidePanelComponent.selectUsers.label')}
                            userIdNames={userIdNames}
                            value={userIds}
                            onChange={setUserIds}
                            validate={validateUserSelection}
                            placeholder={t('projectSidePanelComponent.selectUsers.placeholder')}
                            required={false}
                        />
                    )}

                    <button type="submit" className={styles.button}>
                        {t('projectSidePanelComponent.createProjectButton')}
                    </button>

                    {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
                </form>
            </div>
        </>
    );
};

export default ProjectSidePanel;
