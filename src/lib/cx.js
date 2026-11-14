/** Joins truthy class names: cx("a", false && "b", "c") -> "a c". */
export function cx(...names) {
  return names.filter(Boolean).join(" ");
}
