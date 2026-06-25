type Args = (string | false | null | undefined | Record<string, boolean>)[];

/**
 * Tiny clsx-style className combiner — avoids extra dep.
 */
export function cn(...args: Args): string {
  const out: string[] = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string") {
      out.push(arg);
    } else if (typeof arg === "object") {
      for (const [key, val] of Object.entries(arg)) {
        if (val) out.push(key);
      }
    }
  }
  return out.join(" ");
}
