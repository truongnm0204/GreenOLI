type ClassArg =
  | string
  | false
  | null
  | undefined
  | Record<string, boolean>
  | ClassArg[];

/**
 * Tiny clsx-style className combiner — avoids extra dep.
 * Hỗ trợ string, object map, mảng lồng (vd. `isSelected && ["a", "b"]`).
 */
export function cn(...args: ClassArg[]): string {
  const out: string[] = [];

  const push = (arg: ClassArg): void => {
    if (!arg) return;
    if (typeof arg === "string") {
      out.push(arg);
      return;
    }
    if (Array.isArray(arg)) {
      for (const item of arg) push(item);
      return;
    }
    if (typeof arg === "object") {
      for (const [key, val] of Object.entries(arg)) {
        if (val) out.push(key);
      }
    }
  };

  for (const arg of args) push(arg);
  return out.join(" ");
}
