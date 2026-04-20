import { useTranslation } from "react-i18next";
import { Timeline } from "@/Components/ui/timeline";

import PortfolioImg from "../assets/Projects/portfolio app.png";
import EcommerceImg from "../assets/Projects/E commerce app.png";
import JumpingImg from "../assets/Projects/Jumping dianasour.png";
import TrackifyImg from "../assets/Projects/Trackify.png";
import WatchlyImg from "../assets/Projects/watchly.png";
import NabdhImg from "../assets/Projects/Nabdh-Alibtikar.png";
import NabdhServiceImg from "../assets/Projects/Nabdh-Alibtikar-service section.png";
import NabdhProjectsImg from "../assets/Projects/Nabdh-Alibtikar-projects-page.png";
import MetaFrontendCertImg from "../assets/Certifications/Meta Frontend Developer Certification.png";

const imgClass =
  "h-20 w-full rounded-lg object-cover md:h-44 lg:h-60 shadow-[0_0_24px_rgba(0,0,0,0.4)]";

export default function Experience() {
  const { t } = useTranslation();

  const data = [
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-brand md:text-lg">
            {t("experience.entries.2023")}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <img src={PortfolioImg} alt={t("experience.altPortfolio")} className={imgClass} loading="lazy" decoding="async" />
          </div>
        </div>
      ),
    },
    {
      title: "Aug–Sep 2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-brand-text md:text-lg">
            {t("experience.entries.aug-sep-2024")}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={EcommerceImg} alt={t("experience.altEcommerce")} className={imgClass} loading="lazy" decoding="async" />
            <img src={JumpingImg} alt={t("experience.altJumping")} className={imgClass} loading="lazy" decoding="async" />
          </div>
        </div>
      ),
    },
    {
      title: "Late 2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-brand-text md:text-lg">
            {t("experience.entries.late-2024")}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <img
              src={MetaFrontendCertImg}
              alt={t("experience.certBadge.title")}
              className={imgClass}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-brand-text md:text-lg">
            {t("experience.entries.2025")}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={TrackifyImg} alt={t("experience.altTrackify")} className={imgClass} loading="lazy" decoding="async" />
            <img src={WatchlyImg} alt={t("experience.altWatchly")} className={imgClass} loading="lazy" decoding="async" />
          </div>
        </div>
      ),
    },
    {
      title: "Oct 2025 – Now",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-brand-text md:text-lg">
            {t("experience.entries.oct-2025-now")}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={NabdhImg} alt={t("experience.altNabdh")} className={imgClass} loading="lazy" decoding="async" />
            <img src={NabdhServiceImg} alt={t("experience.altNabdhService")} className={imgClass} loading="lazy" decoding="async" />
            <img
              src={NabdhProjectsImg}
              alt={t("experience.altNabdhProjects")}
              className={`col-span-2 ${imgClass}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience">
      <Timeline
        data={data}
        heading={t("experience.journeyTitle")}
        subheading={t("experience.journeySubtitle")}
      />
    </section>
  );
}
