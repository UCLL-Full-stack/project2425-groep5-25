import MainLayout from '@components/layout/MainLayout';
import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import ProjectSidePanel from '@components/projects/ProjectSidePanel';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import userTokenInfo from 'hooks/userTokenInfo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSWR from 'swr';
import { handleResponse } from 'utils/responseUtils';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = userTokenInfo();

    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

    const getUsersAndProjects = async () => {
        try {
            const [usersResponse, projectsResponse] = await Promise.all([
                userService.getAllUsersIdName(),
                projectService.getAllProjects(),
            ]);

            const [userIdNames, projects] = await Promise.all([
                handleResponse(usersResponse),
                handleResponse(projectsResponse),
            ]);

            return { userIdNames, projects };
        } catch (error) {
            console.error(t('error.fetchingData'), error);
            return null;
        }
    };

    const { data, isLoading } = useSWR('usersAndProjects', getUsersAndProjects);

    return (
        <>
            <MainLayout
                title={t('projects.title')}
                description={t('projects.description')}
                isLoading={isLoading}
                titleContent={
                    data &&
                    userRole === 'admin' && (
                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                            {t('projects.addProjectButton')}
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
