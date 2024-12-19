import { ProjectOutput } from '@types';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatOptionLabelByColor, getColorName } from 'utils/colorUtils';

type Props = {
    projects: Array<ProjectOutput>;
};

const ProjectOverviewTable: React.FC<Props> = ({ projects }: Props) => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleRowClick = (projectId: number | undefined) => {
        if (projectId) {
            router.push(`/projects/${projectId}`);
        }
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
                                {t('components.projectOverviewTable.labels.id')}
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                {t('components.projectOverviewTable.labels.color')}
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                {t('components.projectOverviewTable.labels.name')}
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                {t('components.projectOverviewTable.labels.userCount')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr
                                key={index}
                                className="cursor-pointer hover:bg-gray-50 border-b"
                                onClick={() => handleRowClick(project.id)}>
                                <td className="px-4 py-2 text-sm text-gray-900 border-r">
                                    {project.id}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900 border-r">
                                    {formatOptionLabelByColor({
                                        label: getColorName(project.color as string),
                                        color: project.color as string,
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
