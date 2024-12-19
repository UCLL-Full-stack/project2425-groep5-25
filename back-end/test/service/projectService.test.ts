import { beforeEach, expect, jest, test } from '@jest/globals';
import { UnauthorizedError } from 'express-jwt';
import { afterEach } from 'node:test';
import { Project } from '../../model/project';
import { User } from '../../model/user';
import { projectDb } from '../../repository/project.db';
import { projectService } from '../../service/project.service';
import { userService } from '../../service/user.service';
import { Color, JwtToken, ProjectInput, Role } from '../../types';
let mockGetAllProjects: jest.MockedFunction<typeof projectDb.getAllProjects>;
let mockGetProjectsByUserId: jest.MockedFunction<typeof projectDb.getProjectsByUserId>;
let mockGetProjectById: jest.MockedFunction<typeof projectDb.getProjectById>;
let mockUpdateProject: jest.MockedFunction<typeof projectDb.updateProject>;
let mockGetUserByIds: jest.MockedFunction<typeof userService.getUsersByIds>;
let mockGetProjectByName: jest.MockedFunction<typeof projectDb.getProjectByName>;
let mockDeleteProject: jest.MockedFunction<typeof projectDb.deleteProject>;
let mockCreateProject: jest.MockedFunction<typeof projectDb.createProject>;
let mockaddUsersToProject: jest.MockedFunction<typeof projectDb.addUsersToProject>;

const cUser1 = new User({
    id: 1,
    userName: 'Yasir_DaBoss',
    firstName: 'Yasir',
    lastName: 'Hozan',
    email: 'yasir.hozan@example.com',
    passWord: '@Password123!',
    role: 'user' as Role,
});

const cUser2 = new User({
    id: 2,
    userName: 'Roel_DaBoss',
    firstName: 'Roel',
    lastName: 'Crabbé',
    email: 'roel.crabbe@example.com',
    passWord: '@Password123!',
    role: 'admin' as Role,
});
const defaultProject = new Project({
    id: 1,
    name: 'General',
    color: Color.Gray,
    users: [],
});
const updatedDefaultProject = new Project({
    id: 1,
    name: 'General',
    color: Color.Gray,
    users: [cUser1, cUser2],
});
const cProject5 = new Project({
    id: 5,
    name: 'Test22',
    color: Color.Gray,
    users: [cUser1],
});
const cProject3 = new Project({
    name: 'Test1234',
    color: Color.Orange,
    users: [cUser2],
});
const cProject2 = new Project({
    name: 'Test123',
    color: Color.Blue,
    users: [cUser2],
});
const projectForUpdate = new Project({
    id: 5,
    name: 'updatedname',
    color: Color.Red,
    users: [cUser2],
});
const updatedProject = new Project({
    id: 5,
    name: 'updatedname',
    color: Color.Red,
    users: [cUser1, cUser2],
});
const mockAllProjects = [cProject5, cProject2, cProject3];
const mockProjectsForUser = [cProject3, cProject2];
const projectIdForSearchFunctions = 1;
const authAdmin: JwtToken = { userId: 1, role: 'admin' as Role };
const authUser: JwtToken = { userId: 1, role: 'user' as Role };
const notAuthorized: JwtToken = { userId: 1, role: '' as Role };
const projectInput: ProjectInput = { id: 5, name: 'updatedname', color: Color.Red, userIds: [2] };
const projectInputForDefaultProject: ProjectInput = {
    id: 1,
    name: 'updatedname',
    color: Color.Red,
    userIds: [2],
};
//expectedProject does not contain a id field because it shows that which given input triggered our mocks and while creating a project pretty normal you dont have a id
const expectedProject = new Project({
    name: projectInput.name!,
    color: projectInput.color!,
    users: [cUser2],
});

beforeEach(() => {
    mockGetAllProjects = jest.fn();
    mockGetProjectsByUserId = jest.fn();
    mockGetProjectById = jest.fn();
    mockUpdateProject = jest.fn();
    mockGetUserByIds = jest.fn();
    mockGetProjectByName = jest.fn();
    mockDeleteProject = jest.fn();
    mockCreateProject = jest.fn();
    mockaddUsersToProject = jest.fn();
    projectDb.addUsersToProject = mockaddUsersToProject;
    projectDb.createProject = mockCreateProject;
    projectDb.deleteProject = mockDeleteProject;
    projectDb.getProjectByName = mockGetProjectByName;
    userService.getUsersByIds = mockGetUserByIds;
    projectDb.updateProject = mockUpdateProject;
    projectDb.getProjectsByUserId = mockGetProjectsByUserId;
    projectDb.getAllProjects = mockGetAllProjects;
    projectDb.getProjectById = mockGetProjectById;
});
afterEach(() => {
    jest.clearAllMocks();
});
//getAllProjects
test('should return all projects for admin and hr ', async () => {
    //given
    mockGetAllProjects.mockResolvedValue(mockAllProjects);
    //when
    const result = await projectService.getAllProjects({ auth: authAdmin });
    console.log(result);
    //then
    expect(result).toEqual(mockAllProjects);

    expect(mockGetAllProjects).toHaveBeenCalledTimes(1);
});
test('should not return all projects instead should return your project(getProjectByUserId) user ', async () => {
    //given
    mockGetProjectsByUserId.mockResolvedValue(mockProjectsForUser);
    //when
    const result = await projectService.getAllProjects({ auth: authUser });
    //then
    expect(mockGetProjectsByUserId).toHaveBeenCalledWith({ userId: 1 });
    expect(result).toEqual(mockProjectsForUser);

    //here we wont expect our mockGetAllProject to be called not even once therefore not used our service should lead to getProjectsByUserId once role given as user and here we are mocking that to return projects for user.
});
test('should  throw an error if user not authorized  ', async () => {
    //given
    //when
    //then
    await expect(projectService.getAllProjects({ auth: notAuthorized })).rejects.toThrow(
        new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        }),
    );
});

//getAllProjectsByUserId
test('should  return projects for a user(getProjectByUserId) ', async () => {
    //given
    mockGetProjectsByUserId.mockResolvedValue(mockProjectsForUser);
    //when
    const result = await projectService.getAllProjectsByUserId({ auth: authUser });
    //then
    expect(mockGetProjectsByUserId).toHaveBeenCalledWith({ userId: 1 });
    expect(result).toEqual(mockProjectsForUser);
});
test('should  throw an error if user not authorized  ', async () => {
    //given
    //when
    //then
    await expect(projectService.getAllProjectsByUserId({ auth: notAuthorized })).rejects.toThrow(
        new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        }),
    );
});

//getProjectById
test('should  return a project with given id  ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(cProject5);
    //when
    const result = await projectService.getProjectById({ auth: authAdmin, projectId: 5 });
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 5 }); //here we pass projectId in service but in projectdb that we ve already mocked expects just id not a projectId SO if you are mockin db give expected parameter names as well good to know .
    expect(result).toEqual(cProject5);
});
test('should  throw an error if project does not exist  ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(null); //here we are mocking behaviour of db for an empty project return so that it throws an error
    //when

    await expect(
        projectService.getProjectById({ auth: authAdmin, projectId: projectIdForSearchFunctions }),
    ).rejects.toThrow(`Project with id <${projectIdForSearchFunctions}> doesn't exist.`);
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 1 });
});
test('should  throw an error if user not authorized  ', async () => {
    //given
    //when
    //then
    await expect(
        projectService.getProjectById({
            auth: notAuthorized,
            projectId: projectIdForSearchFunctions,
        }),
    ).rejects.toThrow(
        new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        }),
    );
});
//updateProject
test('should  update a project with given id and project input ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(cProject5);
    mockGetUserByIds.mockResolvedValue([cUser2]); //we mock user service function to return the new cUser2 and we will update users of the project with this
    mockUpdateProject.mockResolvedValue(updatedProject);
    mockGetProjectByName.mockResolvedValue(defaultProject); //needed otherwise u receive random errors dunn why
    //when
    const result = await projectService.updateProject({
        auth: authAdmin,
        projectId: 5, //projectId 5 is chosen cos projectId 1 is a general project
        projectInput: projectInput,
    });
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 5 });
    expect(mockGetUserByIds).toHaveBeenCalledWith({ userIds: [2] }); //here we pass projectId in service but in projectdb that we ve already mocked expects just id not a projectId SO if you are mockin db give expected parameter names as well good to know .
    expect(mockUpdateProject).toHaveBeenCalledWith(projectForUpdate);
    expect(mockUpdateProject).toHaveBeenCalledTimes(1);
    expect(mockGetUserByIds).toHaveBeenCalledTimes(1);
    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedProject);
    //cant lie it was pain in the back door ohh
});
test('should throw an error if given project id mismatch ', async () => {
    //given
    //when
    //then
    await expect(
        projectService.updateProject({
            auth: authAdmin,
            projectId: 4,
            projectInput: projectInput,
        }),
    ).rejects.toThrow('Project id mismatch.');
});
test('should throw an error if given project id does not exist ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(null);
    //when
    //then
    await expect(
        projectService.updateProject({
            auth: authAdmin,
            projectId: 5,
            projectInput: projectInput,
        }),
    ).rejects.toThrow(`Project with id <${projectInput.id}> doesn't exist.`);
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: projectInput.id });

    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
});
test('should throw an error if given project is default project ', async () => {
    //given
    mockGetProjectByName.mockResolvedValue(defaultProject);
    mockGetProjectById.mockResolvedValue(defaultProject);
    //when
    //then
    await expect(
        projectService.updateProject({
            auth: authAdmin,
            projectId: 1,
            projectInput: projectInputForDefaultProject,
        }),
    ).rejects.toThrow('Cannot update default project.');
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: projectInputForDefaultProject.id });
    expect(mockGetProjectByName).toHaveBeenCalledWith({ name: 'General' });
    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
    expect(mockGetProjectByName).toHaveBeenCalledTimes(1);
});
test('should  throw an error if user is not authorized ', async () => {
    //given
    // you need to mock everything beside updataProject because authorization is last step
    mockGetProjectById.mockResolvedValue(cProject5);
    mockGetUserByIds.mockResolvedValue([cUser2]);

    mockGetProjectByName.mockResolvedValue(defaultProject);
    //when
    await expect(
        projectService.updateProject({
            auth: notAuthorized,
            projectId: 5,
            projectInput: projectInput,
        }),
    ).rejects.toThrow(
        new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        }),
    );
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 5 });
    expect(mockGetUserByIds).toHaveBeenCalledWith({ userIds: [2] }); //here we pass projectId in service but in projectdb that we ve already mocked expects just id not a projectId SO if you are mockin db give expected parameter names as well good to know .
    expect(mockGetUserByIds).toHaveBeenCalledTimes(1);
    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
});
//deleteProjectById
test('should  delete a project with given id ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(cProject5);
    mockDeleteProject.mockResolvedValue(cProject5);
    mockGetProjectByName.mockResolvedValue(defaultProject); // you gotta add it each time that u use something with getDefaultProject beforehand it was not needed but we have mocked so if you dont use this it will not check default function which leads to an error

    //when
    const result = await projectService.deleteProjectById({
        auth: authAdmin,
        projectId: 5,
    });
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 5 });
    expect(mockDeleteProject).toHaveBeenCalledWith(cProject5);
    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
    expect(mockDeleteProject).toHaveBeenCalledTimes(1);
    expect(result).toEqual(cProject5);
});
test('should throw an error if the project with given id does not exist ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(null);
    mockDeleteProject.mockResolvedValue(cProject5);

    //when
    await expect(
        projectService.deleteProjectById({
            auth: authAdmin,
            projectId: 5,
        }),
    ).rejects.toThrow(`Project with id <${5}> doesn't exist.`);
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 5 });

    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
});
test('should throw an error if the given project is default  ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(defaultProject);

    mockGetProjectByName.mockResolvedValue(defaultProject);

    //when
    await expect(
        projectService.deleteProjectById({
            auth: authAdmin,
            projectId: 1,
        }),
    ).rejects.toThrow('Cannot delete default project.');
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 1 });
    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
    expect(mockGetProjectByName).toHaveBeenCalledWith({ name: 'General' });
    expect(mockGetProjectByName).toHaveBeenCalledTimes(1);
});
test('should throw an error if use is not authorized ', async () => {
    //given
    mockGetProjectById.mockResolvedValue(cProject5);

    mockGetProjectByName.mockResolvedValue(defaultProject);

    //when
    await expect(
        projectService.deleteProjectById({
            auth: notAuthorized,
            projectId: 5,
        }),
    ).rejects.toThrowError(
        new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        }),
    );
    //then
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: 5 });
    expect(mockGetProjectById).toHaveBeenCalledTimes(1);
    expect(mockGetProjectByName).toHaveBeenCalledWith({ name: 'General' });
    expect(mockGetProjectByName).toHaveBeenCalledTimes(1);
});
//createProject
test('should create a project with given project input ', async () => {
    //given

    mockGetUserByIds.mockResolvedValue([cUser2]);
    mockGetProjectByName.mockResolvedValue(null);
    mockCreateProject.mockResolvedValue(projectForUpdate);
    //when
    const result = await projectService.createProject({
        auth: authAdmin,
        projectInput: projectInput,
    });
    //then

    expect(mockGetUserByIds).toHaveBeenCalledWith({ userIds: [2] });
    expect(mockCreateProject).toHaveBeenCalledWith(expectedProject);
    expect(mockCreateProject).toHaveBeenCalledTimes(1);
    expect(mockGetUserByIds).toHaveBeenCalledTimes(1);

    expect(result).toEqual(projectForUpdate);
});
test('should throw an error if given user is not authorized ', async () => {
    //given
    //when
    //then
    await expect(
        projectService.createProject({
            auth: notAuthorized,
            projectInput: projectInput,
        }),
    ).rejects.toThrowError(
        new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        }),
    );
});
test('should throw an error if given project already exists', async () => {
    //given

    mockGetProjectByName.mockResolvedValue(projectForUpdate);
    //when
    //then
    await expect(
        projectService.createProject({
            auth: authAdmin,
            projectInput: projectInput,
        }),
    ).rejects.toThrowError(`Project with name <${projectInput.name}> already exists.`);

    expect(mockGetProjectByName).toHaveBeenCalledTimes(1);
    expect(mockGetProjectByName).toHaveBeenCalledWith({ name: projectInput.name });
});
//addUsersToDefaultProject
test('should add Users to the default project with given project input ', async () => {
    //given
    mockGetProjectByName.mockResolvedValue(defaultProject);
    mockGetUserByIds.mockResolvedValue([cUser2]);
    mockaddUsersToProject.mockResolvedValue(updatedDefaultProject);
    //when
    const result = await projectService.addUsersToDefaultProject(projectInputForDefaultProject);
    //then

    expect(mockGetUserByIds).toHaveBeenCalledWith({ userIds: [2] });
    expect(mockGetUserByIds).toHaveBeenCalledTimes(1);
    //expect(mockaddUsersToProject).toHaveBeenCalledWith(defaultProject); no need to add extra mock data for this it basically expects a general project with user2 attached to it but while mockin general project we making it with empty array so no need
    expect(mockaddUsersToProject).toHaveBeenCalledTimes(1);

    expect(result).toEqual(updatedDefaultProject);
});
//after all suffering here we are at the end to new sufferings .-y
