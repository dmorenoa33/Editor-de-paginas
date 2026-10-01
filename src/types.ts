export type ElementColor =
  | "WHITE"
  | "GREEN"
  | "YELLOW"
  | "RED"
  | "CYAN"
  | "MAGENTA";

export type ElementSize = "SMALL" | "BIG";

export type UnitKind = "TITLE" | "LEFT" | "RIGHT";

export interface ScreenElement {
  id: string;
  title: string;
  color: ElementColor;
  size: ElementSize;
  underlined: boolean;
  flashing: boolean;
  reverseVideo: boolean;
  col: number;
  row: number;
}

export interface ScreenUnit {
  key: string;
  kind: UnitKind;
  side?: "L" | "R";
  index?: number;
  mode?: "UP" | "DWN";
  row: number;
  elements: ScreenElement[];
}

export interface ScreenModel {
  title: string;
  units: Record<string, ScreenUnit>;
}
