export type Component = {
  color: Color;
  shape: Shape;
  size: number;
};

enum Color {
  Red = "#FF0000",
  Blue = "#0000FF",
  Yellow = "#FFFF00",
  Green = "#00FF00",
  Black = "#000000",
  White = "#FFFFFF",
}

enum Shape {
  Circle = "circle",
  Square = "square",
}
