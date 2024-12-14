import { ProjectOutput } from '@types';

type Props = {
    project: ProjectOutput;
};

const ProjectDetails: React.FC<Props> = ({ project }: Props) => {
    return (
        <>
            {' '}
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold mb-4" style={{ color: project.color }}>
                    {project.name}
                </h2>
                {project.id !== undefined && (
                    <p className="text-gray-600 mb-2">
                        <strong>Project ID:</strong> {project.id}
                    </p>
                )}
                <p className="text-gray-600 mb-4">
                    <strong>Color:</strong>{' '}
                    <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ backgroundColor: project.color }}></span>
                </p>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Users</h3>
                    {project.users && project.users.length > 0 ? (
                        <ul className="space-y-2">
                            {project.users.map((user) => (
                                <li
                                    key={user.id}
                                    className="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200">
                                    <p className="text-gray-700">
                                        <strong>Name:</strong> {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Username:</strong> {user.userName}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Role:</strong> {user.role}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No users associated with this project.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectDetails;
