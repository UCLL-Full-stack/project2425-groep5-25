import { ProjectOutput } from '@types';
import React from 'react';
import { formatOptionLabel, getColorName } from 'utils/colorUtils';

type Props = {
    projects: Array<ProjectOutput>;
};

const ProjectOverviewTable: React.FC<Props> = ({ projects }: Props) => {
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
                            <tr key={index} className="cursor-pointer hover:bg-gray-50 border-b">
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
