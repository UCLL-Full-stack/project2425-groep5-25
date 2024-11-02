import { WorkDay } from '../../back-end/model/workDay';

export type ProjectDto = {
  name?: string;
  color?: String;
  userCount?:number ;
};

export type ProjectInputDto = {
  
  name: string;
  color: string;
  users: number[];
  
};
;
