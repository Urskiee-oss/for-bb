export type Decoration = {
  id: number;
  left: number;
  top: number;
  size: number;
  offsetY: number;
  duration: number;
  delay?: number;
  rotation?: number;
};

function seededValue(seed: number, index: number) {
  let value = seed + index * 374761393;
  value = (value ^ (value >> 13)) * 1274126177;
  return (value ^ (value >> 16)) >>> 0;
}

function normalized(seed: number, index: number, offset: number) {
  return (seededValue(seed + offset, index) % 10_000) / 10_000;
}

export function createFloatingDecorations(
  count: number,
  seed: number
): Decoration[] {
  return Array.from({ length: count }, (_, index) => {
    const left = normalized(seed, index, 1) * 100;
    const top = normalized(seed, index, 2) * 100;
    const size = normalized(seed, index, 3) * 18 + 10;
    const offsetY = -100 - normalized(seed, index, 4) * 220;
    const duration = normalized(seed, index, 5) * 5 + 5;
    const delay = normalized(seed, index, 6) * 2;
    const rotation = normalized(seed, index, 7) * 360;

    return {
      id: index,
      left,
      top,
      size,
      offsetY,
      duration,
      delay,
      rotation,
    };
  });
}