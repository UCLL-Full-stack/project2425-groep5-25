import ErrorMessage from '@components/layout/ErrorMessage';
import MainLayout from '@components/layout/MainLayout';
import ProjectDetails from '@components/projects/ProjectDetails';
import ProjectUsersDetails from '@components/projects/ProjectUsersDetails';
import Button from '@components/shared/Button';
import ConfirmationDialog from '@components/shared/ConfirmationDialog';
import handleResponse from '@hooks/handleResponse';
import handleTokenInfo from '@hooks/handleTokenInfo';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import { ErrorLabelMessage, ProjectInput } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const ProjectById: React.FC = () => {
    const router = useRouter();
    const { projectId } = router.query;
    const { t } = useTranslation();
    const { handleUnauthorized } = handleResponse();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [isTryingToDelete, setIsTryingToDelete] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const getProjectByIdAndUsersIdName = async () => {
        try {
            const [projectResponse] = await Promise.all([
                projectService.getProjectById(projectId as string),
            ]);

            let usersResponse;
            if (userRole === 'admin' || userRole === 'hr') {
                usersResponse = await userService.getAllUsersIdName();
            }

            await handleUnauthorized(projectResponse);
            await handleUnauthorized(usersResponse);

            if (projectResponse.ok && (!usersResponse || usersResponse.ok)) {
                const project = await projectResponse.json();
                const userIdNames = usersResponse ? await usersResponse.json() : null;
                return { project, userIdNames };
            }
            return null;
        } catch (error) {
            console.error('Error fetching data', error);
            return null;
        }
    };

    const { data, isLoading } = useSWR(
        projectId && !isDeleted ? `projectUserIdNames` : null,
        getProjectByIdAndUsersIdName,
    );

    useInterval(() => {
        if (projectId && !isDeleted) {
            mutate(`projectUserIdNames`, getProjectByIdAndUsersIdName);
        }
    }, 1000);

    const handleUpdate = async (data: ProjectInput) => {
        setErrorLabelMessage(undefined);

        try {
            const formData: ProjectInput = {
                id: data.id,
                name: data.name,
                color: data.color,
                userIds: data.userIds,
            };
            const [projectResponse] = await Promise.all([
                projectService.updateProject(projectId as string, formData),
            ]);
            const [projectJson] = await Promise.all([projectResponse.json()]);

            if (!projectResponse.ok) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: projectJson.message || t('error.unexpectedErrorMessage'),
                });
                return;
            }

            toast.success(t('pages.projects.success'));
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: error.message || t('error.unexpectedErrorMessage'),
                });
            }
        }
    };

    const deleteProject = () => {
        setIsTryingToDelete(true);
        setErrorLabelMessage(undefined);

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 2000);
    };

    const confirmDelete = async () => {
        setIsTryingToDelete(false);

        try {
            const [projectResponse] = await Promise.all([
                projectService.deleteProjectById(projectId as string),
            ]);
            const [projectJson] = await Promise.all([projectResponse.json()]);

            if (!projectResponse.ok) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: projectJson.message || t('error.unexpectedErrorMessage'),
                });
                return;
            }

            setIsDeleted(true);
            toast.success(t('pages.projects.success'));

            setTimeout(() => {
                router.push('/projects');
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: error.message || t('error.unexpectedErrorMessage'),
                });
            }
        }
    };

    const cancelDelete = () => {
        setIsTryingToDelete(false);
    };

    const getTitle = () => {
        if (data) {
            return `Project ${data.project.name}`;
        }
        return 'Projects';
    };

    return (
        <>
            <MainLayout
                title={getTitle()}
                description="Project tracker projects"
                isLoading={isLoading}
                titleContent={
                    data &&
                    userRole === 'admin' && (
                        <Button
                            type="button"
                            onClick={deleteProject}
                            isLoading={isButtonDisabled}
                            isDisabled={isButtonDisabled}
                            label={
                                isButtonDisabled
                                    ? t('components.timeBlockSideForm.processing')
                                    : t('pages.projects.deleteProject')
                            }
                        />
                    )
                }>
                <div className="project-detail-container">
                    <div className="project-inner-detail-container">
                        {data ? (
                            <>
                                <div className="w-full max-w-3xl h-fit">
                                    <ProjectDetails
                                        onSubmit={handleUpdate}
                                        clearParentErrors={() => setErrorLabelMessage(undefined)}
                                        project={data.project}
                                        userIdNames={data.userIdNames}>
                                        {errorLabelMessage && (
                                            <ErrorMessage errorLabelMessage={errorLabelMessage} />
                                        )}
                                    </ProjectDetails>
                                </div>
                                <div className="w-full max-w-3xl">
                                    <ProjectUsersDetails project={data.project} />
                                </div>
                            </>
                        ) : (
                            <div className="w-full text-center mt-4">
                                <p>{t('error.projectNotFound')}</p>
                                <p>{t('error.projectDeletedOrNotLoaded')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {isTryingToDelete && (
                    <ConfirmationDialog
                        onDelete={confirmDelete}
                        onClose={cancelDelete}
                        label={t('pages.projects.deleteConfirmation')}
                    />
                )}
            </MainLayout>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default ProjectById;
