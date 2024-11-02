export type ProjectUserCountDto = {
  id?: number;
  name?: string;
  color?: String;
  userCount?: number;
};

export type ProjectInputDto = {
  name: string;
  color: Color;
  userIds: number[];
};

export enum Color {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
  Yellow = '#FFFF00',
  Orange = '#FFA500',
  Purple = '#800080',
  Black = '#000000',
  White = '#FFFFFF',
}

export type IdName = {
  id?: number;
  name: string;
}