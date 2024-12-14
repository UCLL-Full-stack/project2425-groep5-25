import { ProjectOutput } from '@types';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { formatOptionLabel, getColorName } from 'utils/colorUtils';

type Props = {
    projects: Array<ProjectOutput>;
};

const ProjectOverviewTable: React.FC<Props> = ({ projects }: Props) => {
    const router = useRouter();

    const confirmNavigation = (projectId: number | undefined) => {
        if (!projectId) return;

        toast.info(
            <div>
                <p>Are you sure you want to navigate to Project ID: {projectId}?</p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => {
                            router.push(`/projects/${projectId}`);
                            toast.dismiss();
                        }}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-300 px-4 py-1 rounded-md hover:bg-gray-400">
                        No
                    </button>
                </div>
            </div>,
            { autoClose: false, closeOnClick: false },
        );
    };

    return (
        <>
            {projects && (
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Id
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Color
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Aantal Gebruikers
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr
                                key={index}
                                className="cursor-pointer hover:bg-gray-50 border-b"
                                onClick={() => confirmNavigation(project.id)}>
                                <td className="px-4 py-2 text-sm text-gray-900 border-r">
                                    {project.id}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900 border-r">
                                    {formatOptionLabel({
                                        label: getColorName(project.color as string),
                                        value: project.color as string,
                                    })}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900 border-r">
                                    {project.name}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                    {project.users?.length}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ProjectOverviewTable;
