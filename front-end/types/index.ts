export type ProjectUserCountDto = {
  id?: number;
  name?: string;
  color?: String;
  userCount?: number;
};

export type ProjectInput = {
  name?: string;
  color?: Color;
};

export enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF",
  Yellow = "#FFFF00",
  Orange = "#FFA500",
  Purple = "#800080",
  Gray = "#000000",
}

export type IdName = {
  id?: number;
  name: string;
};

export type ErrorLabelMessage = {
  label: string;
  message: string;
};

export type ProjectToUserInput = {
  projectId?: number;
  userIds?: number[];
};
