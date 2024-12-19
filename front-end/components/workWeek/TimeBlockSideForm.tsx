import ErrorMessage from '@components/layout/ErrorMessage';
import Button from '@components/shared/Button';
import ProjectSelectField from '@components/shared/ProjectSelectField';
import { timeBlockService } from '@services/timeBlockService';
import { ErrorLabelMessage, ProjectOutput, TimeBlockInput } from '@types';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

type Props = {
    projects: ProjectOutput[];
};

const TimeBlockSideForm: React.FC<Props> = ({ projects }: Props) => {
    const { t } = useTranslation();
    const [isButtonActive, setIsButtonActive] = useState<boolean>(true);
    const [isButtonLoading, setIsButtonDisabled] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<ProjectOutput | null>(null);
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    useEffect(() => {
        const savedButtonState = localStorage.getItem('isButtonActive');
        if (savedButtonState !== null) {
            setIsButtonActive(JSON.parse(savedButtonState));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isButtonActive', JSON.stringify(isButtonActive));
    }, [isButtonActive]);

    const validateProject = (project: ProjectOutput | null) => {
        if (!project) return 'Please select a project';
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        const nameError = validateProject(selectedProject);

        if (nameError) {
            setErrorLabelMessage({
                label: t('error.unexpectedErrorLabel'),
                message: nameError || t('error.unexpectedErrorMessage'),
            });
            return false;
        }

        return valid;
    };

    const handleButton = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorLabelMessage(undefined);

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 2000);

        if (isButtonActive) {
            await createTimeBlock();
        } else {
            await stopTimeBlock();
        }
    };

    const createTimeBlock = async () => {
        if (!validate()) {
            return;
        }

        try {
            const formData: TimeBlockInput = { projectId: selectedProject!.id };
            const timeBlockResponse = await timeBlockService.startTimeBlock(formData);
            const timeBlockJson = await timeBlockResponse.json();

            if (!timeBlockResponse.ok)
                throw new Error(timeBlockJson.message || t('error.unexpectedErrorMessage'));

            setIsButtonActive(false);
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: error.message || t('error.unexpectedErrorMessage'),
                });
            }
        }
    };

    const stopTimeBlock = async () => {
        try {
            const timeBlockResponse = await timeBlockService.stopTimeBlock();
            const timeBlockJson = await timeBlockResponse.json();

            if (!timeBlockResponse.ok)
                throw new Error(timeBlockJson.message || t('error.unexpectedErrorMessage'));

            setIsButtonActive(true);
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
            {projects && (
                <div className="max-w-md p-6 bg-white min-w-[250px] rounded-lg shadow-lg border border-gray-200">
                    <div className="mb-4">
                        <ProjectSelectField
                            label="Project"
                            projects={projects}
                            value={selectedProject}
                            onChange={setSelectedProject}
                            validate={validateProject}
                            placeholder="Selecteer Project"
                            required
                        />
                    </div>

                    <Button
                        onClick={handleButton}
                        isLoading={isButtonLoading}
                        isDisabled={isButtonLoading}
                        isActive={isButtonActive}
                        label={
                            isButtonLoading
                                ? 'Processing...'
                                : isButtonActive
                                  ? 'Start working'
                                  : 'Stop working'
                        }
                    />

                    {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
                </div>
            )}
        </>
    );
};

export default TimeBlockSideForm;
