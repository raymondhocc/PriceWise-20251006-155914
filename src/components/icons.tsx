import {
  LayoutDashboard,
  Target,
  FileText,
  Settings,
  Bot,
  ChevronUp,
  ChevronDown,
  Search,
  type LucideProps,
} from 'lucide-react';
export const Icons = {
  Dashboard: LayoutDashboard,
  Targets: Target,
  Reports: FileText,
  Settings: Settings,
  Logo: Bot,
  ChevronUp,
  ChevronDown,
  Search,
};
export type Icon = keyof typeof Icons;