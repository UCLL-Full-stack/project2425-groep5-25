import ErrorMessage from '@components/layout/ErrorMessage';
import ProjectSelectField from '@components/shared/ProjectSelectField';
import { ErrorLabelMessage, ProjectOutput } from '@types';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

type Props = {
    projects: ProjectOutput[];
};

const TimeBlockSideForm: React.FC<Props> = ({ projects }: Props) => {
    const { t } = useTranslation();
    const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<ProjectOutput | null>(null);
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const validateProject = (project: ProjectOutput | null) => {
        if (!project) return 'Please select a project';
        return null;
    };

    const handleButtonClick = () => {
        const error = validateProject(selectedProject);
        if (error) {
            setErrorLabelMessage({ label: t('error.unexpectedErrorLabel'), message: error });
            return;
        }

        setErrorLabelMessage(undefined);
        setIsButtonActive((prev) => !prev);
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

                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className={`w-full py-2 px-4 rounded-lg shadow-md text-white transition duration-200 
                    ${isButtonActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                        {isButtonActive ? 'Stop working' : 'Start working'}
                    </button>

                    {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
                </div>
            )}
        </>
    );
};

export default TimeBlockSideForm;
