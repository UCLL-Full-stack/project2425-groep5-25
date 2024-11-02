export type ProjectUserCountDto = {
  id?: number;
  name?: string;
  color?: String;
  userCount?:number ;
};

export type ProjectInputDto = {
  
  name: string;
  color: string;
  users: number[];
  
};
