import { WorkDay } from '../../back-end/model/workDay';

export type Project = {
  name?: string;
  color?: String;
  userCount?:number ;
};

export type ProjectDto = {
  id: number;
  name: string;
  color: string;
  users: number;
  
};
;
