export enum KeyboardKey {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export type Keys = keyof typeof KeyboardKey;

export type MappedKeys = {
  [key in Keys]: number;
};

export const KEYS: MappedKeys = {
  [KeyboardKey.UP]: 38,
  [KeyboardKey.DOWN]: 40,
  [KeyboardKey.LEFT]: 37,
  [KeyboardKey.RIGHT]: 39,
};

export const KONAMI_SEQUENCE = [
  KEYS.UP,
  KEYS.UP,
  KEYS.LEFT,
  KEYS.RIGHT,
  KEYS.DOWN,
  KEYS.DOWN,
];
