export interface StoryCell {
  a: number;
  b: number;
  c: number;
}

export interface StoryRow {
  cells: StoryCell[];
}

export interface Story {
  x: number;
  y: number;
  rows: StoryRow[];
}
