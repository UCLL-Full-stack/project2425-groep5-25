import MainLayout from '@components/layout/MainLayout';
import ProjectOverviewTable from '@components/projects/ProjectOverviewTable';
import ProjectSidePanel from '@components/projects/ProjectSidePanel';
import { projectService } from '@services/projectService';
import { userService } from '@services/userService';
import userTokenInfo from 'hooks/userTokenInfo';
import { useState } from 'react';
import useSWR from 'swr';
import { handleResponse } from 'utils/responseUtils';

const Home: React.FC = () => {
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
            console.error('Error fetching data', error);
            return null;
        }
    };

    const { data, isLoading } = useSWR('usersAndProjects', getUsersAndProjects);

    return (
        <>
            <MainLayout
                title="Projects"
                description="Project tracker projects"
                isLoading={isLoading}
                titleContent={
                    data &&
                    userRole === 'admin' && (
                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                            Add Project
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

export default Home;
