import MainLayout from '@components/layout/MainLayout';
import ProjectDetails from '@components/projects/ProjectDetails';
import { projectService } from '@services/projectService';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import { handleResponse } from 'utils/responseUtils';

const ProjectById: React.FC = () => {
    const router = useRouter();
    const { projectId } = router.query;

    const getProjectById = async () => {
        try {
            const [projectResponse] = await Promise.all([
                projectService.getProjectById(projectId as string),
            ]);

            const [project] = await Promise.all([handleResponse(projectResponse)]);

            return { project };
        } catch (error) {
            console.error('Error fetching data', error);
            return null;
        }
    };

    const { data, isLoading } = useSWR(projectId ? 'getProjectById' : null, getProjectById);

    useInterval(() => {
        if (projectId) {
            mutate('getProjectById', getProjectById());
        }
    }, 5000);

    return (
        <>
            <MainLayout
                title={`Project ${data?.project.name}`}
                description="Project tracker projects"
                isLoading={isLoading}>
                {data && <ProjectDetails project={data.project} />}
            </MainLayout>
        </>
    );
};

export default ProjectById;
