export function getTitle(category?: string) {
  if (!category) return "Unknown";

  switch (category.toLowerCase()) {
    case "concert":
      return "콘서트";
    case "camping":
      return "캠핑";
    case "fansign":
      return "팬싸인회";
    case "restaurant":
      return "식당";
    case "hotel":
      return "호텔";
    case "all":
      return "전체";
    default:
      return "N/A";
  }
}
