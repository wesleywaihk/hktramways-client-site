import type { AnnouncementType } from "@/types/api";

export function getLocalizedLabel(
  announcementType: AnnouncementType | null,
  locale: string,
) {
  if (!announcementType) return "";

  switch (locale) {
    case "zh-HK":
      return announcementType.labelZhHk ?? "";
    case "zh-CN":
      return announcementType.labelZhCn ?? "";
    default:
      return announcementType.labelEn ?? "";
  }
}
