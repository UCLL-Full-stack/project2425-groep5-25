import { ProjectDto } from '../dto';
import { Project } from '../model/project';
import { mapProject } from '../service/mapper.service';
import userRepository from '../repository/user.db';
import { User } from '../model/user';
import { IdName } from '../types';

const getAllUsersIdName = (): IdName[] => {
    try {
        const users: User[] = userRepository.getAllUsers();
        const IdNames: IdName[] = users.map((user) => ({
            id: user.getId(),
            name: `${user.getFirstName()} ${user.getLastName()}`,
        }));
        console.log(IdNames);
        return IdNames;
    } catch (error) {
        throw new Error('Error occurred at project service. See server log for details');
    }
};

export default {
    getAllUsersIdName
};