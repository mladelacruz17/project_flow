/**
 * Formats a date string into "MMM DD, YYYY" (e.g., Apr 23, 2026)
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};