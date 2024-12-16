import { ProjectOutput } from '@types';
import handleTokenInfo from 'hooks/handleTokenInfo';
import { useTranslation } from 'react-i18next';

type Props = {
    project: ProjectOutput;
};

const ProjectUsersDetails: React.FC<Props> = ({ project }: Props) => {
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();

    return (
        <>
            <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl border shadow-md border-gray-300">
                <div className="text-center">
                    <h6 className="text-xl font-semibold text-gray-700 mb-6">
                        {t('components.projectDetails.title')}
                    </h6>
                </div>
                <div className="space-y-4">
                    {project.users && project.users.length > 0 ? (
                        project.users.map((user) => (
                            <div
                                key={user.id}
                                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h6 className="text-lg font-semibold text-gray-700">
                                        {user.firstName} {user.lastName}
                                    </h6>
                                    {userRole === 'admin' && (
                                        <p className="text-gray-500">{user.role}</p>
                                    )}
                                </div>
                                <p className="text-gray-500">{user.email}</p>
                                <p className="text-gray-500">{user.userName}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">{t('components.projectDetails.noUsers')}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectUsersDetails;
