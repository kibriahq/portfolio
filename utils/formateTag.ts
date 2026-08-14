export function formatTag(tag: string): string {
  const formattedTag = tag
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return formattedTag;
}
