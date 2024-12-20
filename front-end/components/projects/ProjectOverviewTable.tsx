import { ProjectOutput } from '@types';
import handleTokenInfo from 'hooks/handleTokenInfo';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatOptionLabelByColor, getColorName } from '../../utils/colorUtils';

type Props = {
    projects: Array<ProjectOutput>;
};

const ProjectOverviewTable: React.FC<Props> = ({ projects }: Props) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();

    const handleRowClick = (projectId: number | undefined) => {
        if (projectId && userRole !== 'user') {
            router.push(`/projects/${projectId}`);
        }
    };

    return (
        <>
            {projects && (
                <table className="table-container">
                    <thead className="table-header">
                        <tr>
                            <th scope="col">{t('components.projectOverviewTable.labels.id')}</th>
                            <th scope="col">{t('components.projectOverviewTable.labels.color')}</th>
                            <th scope="col">{t('components.projectOverviewTable.labels.name')}</th>
                            <th scope="col">
                                {t('components.projectOverviewTable.labels.userCount')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {projects.map((project, index) => (
                            <tr
                                role="button"
                                key={index}
                                onClick={() => handleRowClick(project.id)}>
                                <td className="border-r">{project.id}</td>
                                <td className="border-r">
                                    {formatOptionLabelByColor({
                                        label: getColorName(project.color as string),
                                        color: project.color as string,
                                    })}
                                </td>
                                <td className="border-r">{project.name}</td>
                                <td>{project.users?.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ProjectOverviewTable;
