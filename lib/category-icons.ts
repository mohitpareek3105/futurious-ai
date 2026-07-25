import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Briefcase,
  Code2,
  GraduationCap,
  HelpCircle,
  ImageIcon,
  Megaphone,
  PenSquare,
  Video,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  "pen-square": PenSquare,
  "code-2": Code2,
  image: ImageIcon,
  video: Video,
  megaphone: Megaphone,
  "graduation-cap": GraduationCap,
  briefcase: Briefcase,
};

export function getCategoryIcon(icon: string): LucideIcon {
  return CATEGORY_ICONS[icon] ?? HelpCircle;
}