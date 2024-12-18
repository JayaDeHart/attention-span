export type ComponentValues = {
  color: Color;
  shape: Shape;
  size: number;
};

export enum Color {
  Red = "#FF0000",
  Blue = "#0000FF",
  Yellow = "#FFFF00",
  Green = "#00FF00",
  Black = "#000000",
  White = "#FFFFFF",
}

export enum Shape {
  Circle = "circle",
  Square = "square",
}
