type ClassValue = string | number | false | null | undefined

/**
 * Joins conditional class names into a single string.
 * Keeps variant-based components readable without a runtime dependency.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
