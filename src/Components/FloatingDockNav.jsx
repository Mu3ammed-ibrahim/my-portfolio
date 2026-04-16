import { FloatingDock } from "@/Components/ui/floating-dock";
import { Home, Briefcase, Wrench, Trophy, Mail, FileText } from "lucide-react";

const items = [
  {
    title: "Home",
    icon: <Home className="w-full h-full text-brand-muted" />,
    href: "#hero",
  },
  {
    title: "Projects",
    icon: <Briefcase className="w-full h-full text-brand-muted" />,
    href: "#projects",
  },
  {
    title: "Services",
    icon: <Wrench className="w-full h-full text-brand-muted" />,
    href: "#services",
  },
  {
    title: "Achievements",
    icon: <Trophy className="w-full h-full text-brand-muted" />,
    href: "#achievements",
  },
  {
    title: "Contact",
    icon: <Mail className="w-full h-full text-brand-muted" />,
    href: "#contact",
  },
  {
    title: "Resume",
    icon: <FileText className="w-full h-full text-brand-muted" />,
    href: "/Mohammed Almuatsim Ibrahim V1-Resume.pdf.pdf",
  },
];

export default function FloatingDockNav() {
  return (
    <FloatingDock
      items={items}
      mobileClassName="fixed bottom-6 right-6 z-50"
    />
  );
}
