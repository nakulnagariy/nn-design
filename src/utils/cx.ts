/**
 * Minimal class-name joiner. Kept in-tree so the published package has zero
 * runtime dependencies.
 *
 * Non-string values are dropped rather than stringified. That matters because
 * the common `cond && 'class'` idiom yields whatever falsy value `cond` held —
 * `0`, `''`, `0n` — and rendering "0" as a class name would be a silent bug.
 */
export type ClassValue = string | number | bigint | boolean | null | undefined

export function cx(...values: ClassValue[]): string | undefined {
  const out = values.filter((v): v is string => typeof v === 'string' && v !== '').join(' ')
  return out === '' ? undefined : out
}
