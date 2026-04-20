import { FloatingDock } from "@/Components/ui/floating-dock";
import { Home, Briefcase, Wrench, Trophy, Mail, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";

export default function FloatingDockNav() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "projects", "services", "experience", "contact"];

    const handleScroll = () => {
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      setActiveSection(current || "hero");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = useMemo(
    () => [
      {
        id: "hero",
        title: t("floatingNav.home"),
        icon: <Home className="w-full h-full" />,
        href: "#hero",
      },
      {
        id: "projects",
        title: t("floatingNav.projects"),
        icon: <Briefcase className="w-full h-full" />,
        href: "#projects",
      },
      {
        id: "experience",
        title: t("floatingNav.achievements"),
        icon: <Trophy className="w-full h-full" />,
        href: "#experience",
      },
      {
        id: "services",
        title: t("floatingNav.services"),
        icon: <Wrench className="w-full h-full" />,
        href: "#services",
      },
      {
        id: "contact",
        title: t("floatingNav.contact"),
        icon: <Mail className="w-full h-full" />,
        href: "#contact",
      },
    ],
    [t]
  );

  return (
    <>
      <FloatingDock
        items={items}
        activeKey={activeSection}
        mobileClassName="fixed inset-x-3 bottom-3 z-50"
      />
      <a
        href="/Mohammed%20Almuatsim%20Ibrahim%20Gallab%20resume%20(4).pdf"
        download="Mohammed_Ibrahim_Resume"
        className="fixed bottom-[calc(5.4rem+env(safe-area-inset-bottom))] right-4 rtl:right-auto rtl:left-4 z-50 inline-flex items-center gap-2 rounded-full border border-brand-cta/30 bg-brand-bg/95 px-3 py-2 text-xs font-medium text-brand-cta shadow-lg backdrop-blur-xl"
        aria-label={t("floatingNav.resume")}
      >
        <FileText className="h-4 w-4" />
        <span>{t("floatingNav.resume")}</span>
      </a>
    </>
  );
}
