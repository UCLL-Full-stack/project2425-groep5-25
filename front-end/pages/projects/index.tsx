import MainLayout from '@components/layout/MainLayout';
import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import ProjectSidePanel from '@components/projects/ProjectSidePanel';
import Button from '@components/shared/Button';
import handleResponse from '@hooks/handleResponse';
import handleTokenInfo from '@hooks/handleTokenInfo';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
const Home: React.FC = () => {
    const { t } = useTranslation();
    const { handleUnauthorized } = handleResponse();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

    const getUsersAndProjects = async () => {
        try {
            const projectsResponse = await projectService.getAllProjects();

            let usersResponse;
            if (userRole === 'admin') {
                usersResponse = await userService.getAllUsersIdName();
            }

            await handleUnauthorized(projectsResponse);
            await handleUnauthorized(usersResponse);

            if (projectsResponse.ok && (!usersResponse || usersResponse.ok)) {
                const projects = await projectsResponse.json();
                const userIdNames = usersResponse ? await usersResponse.json() : null;
                return { projects, userIdNames };
            }
            return null;
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
                        <Button
                            type="button"
                            label={t('pages.projects.addProject')}
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                        />
                    )
                }>
                {data && (
                    <>
                        <ProjectOverviewTable projects={data.projects} />
                        {userRole === 'admin' && isSidePanelOpen && (
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

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default Home;
