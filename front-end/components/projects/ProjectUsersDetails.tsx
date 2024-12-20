import handleTokenInfo from '@hooks/handleTokenInfo';
import { ProjectOutput } from '@types';
import { useTranslation } from 'react-i18next';

type Props = {
    project: ProjectOutput;
};

const ProjectUsersDetails: React.FC<Props> = ({ project }: Props) => {
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();

    return (
        <>
            {project && (
                <div className="detail-container">
                    <div className="text-center">
                        <h2 className="mb-6">{t('components.projectUsersDetails.title')}</h2>
                    </div>
                    <div className="user-scroll">
                        {project.users && project.users.length > 0 ? (
                            project.users.map((user) => (
                                <div key={user.id} className="user-wrapper">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold text-gray-700">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        {userRole === 'admin' && <p>{t('roles.' + user.role)}</p>}
                                    </div>
                                    <p>{user.email}</p>
                                    <p>{user.userName}</p>
                                </div>
                            ))
                        ) : (
                            <p>{t('components.projectDetails.noUsers')}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectUsersDetails;
