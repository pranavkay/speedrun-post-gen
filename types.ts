export type HorizontalAlign = 'left' | 'center' | 'right' | 'justify';
export type VerticalAlign = 'start' | 'center' | 'end';
export type Theme = 'pacman' | 'snake' | 'mario';
export type FontFamily = 'Press Start 2P' | 'Jersey 15' | 'VT323' | 'Oswald';
export type AspectRatio = '9/16' | '4/5' | '1/1' | '16/9';

export interface CardConfig {
  text: string;
  textSize: number;
  horizontalAlign: HorizontalAlign;
  verticalAlign: VerticalAlign;
  padding: number;
  theme: Theme;
  font: FontFamily;
  aspectRatio: AspectRatio;
}