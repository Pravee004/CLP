/** Restricts a value to the given range. */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value))
}

/** Re-maps a value from one numeric range into another, clamped to the output range. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax === inMin) return outMin
  const ratio = clamp((value - inMin) / (inMax - inMin))
  return outMin + ratio * (outMax - outMin)
}
