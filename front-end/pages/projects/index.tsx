import MainLayout from '@components/layout/MainLayout';
import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import ProjectSidePanel from '@components/projects/ProjectSidePanel';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import handleResponse from 'hooks/handleResponse';
import handleTokenInfo from 'hooks/handleTokenInfo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { handleApiResponse } = handleResponse();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

    const getUsersAndProjects = async () => {
        try {
            const [usersResponse, projectsResponse] = await Promise.all([
                userService.getAllUsersIdName(),
                projectService.getAllProjects(),
            ]);

            const [userIdNames, projects] = await Promise.all([
                handleApiResponse(usersResponse),
                handleApiResponse(projectsResponse),
            ]);

            return { userIdNames, projects };
        } catch (error) {
            console.error('Error fetching data', error);
            return null;
        }
    };

    const { data, isLoading } = useSWR('usersAndProjects', getUsersAndProjects);

    useInterval(() => {
        mutate('usersAndProjects', getUsersAndProjects);
    }, 1000);

    return (
        <>
            <MainLayout
                title={t('pages.projects.title')}
                description={t('pages.projects.description')}
                isLoading={isLoading}
                titleContent={
                    data &&
                    userRole === 'admin' && (
                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                            {t('pages.projects.addProject')}
                        </button>
                    )
                }>
                {data && (
                    <>
                        <ProjectOverviewTable projects={data.projects} />
                        {isSidePanelOpen && (
                            <ProjectSidePanel
                                userIdNames={data.userIdNames}
                                onClose={() => setIsSidePanelOpen(!isSidePanelOpen)}
                                onProjectCreated={getUsersAndProjects}
                            />
                        )}
                    </>
                )}
            </MainLayout>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default Home;
