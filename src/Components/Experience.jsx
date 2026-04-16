import { Timeline } from "@/Components/ui/timeline";
import { ShieldCheck } from "lucide-react";

import PortfolioImg from "../assets/Projects/portfolio app.png";
import EcommerceImg from "../assets/Projects/E commerce app.png";
import JumpingImg from "../assets/Projects/Jumping dianasour.png";
import TrackifyImg from "../assets/Projects/Trackify.png";
import WatchlyImg from "../assets/Projects/watchly.png";
import NabdhImg from "../assets/Projects/Nabdh-Alibtikar.png";
import NabdhServiceImg from "../assets/Projects/Nabdh-Alibtikar-service section.png";
import NabdhProjectsImg from "../assets/Projects/Nabdh-Alibtikar-projects-page.png";

const imgClass =
  "h-20 w-full rounded-lg object-cover md:h-44 lg:h-60 shadow-[0_0_24px_rgba(0,0,0,0.4)]";

const data = [
  {
    title: "2023",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Started self-teaching HTML, CSS & JavaScript — built personal projects
          to cement the fundamentals.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <img src={PortfolioImg} alt="Portfolio project" className={imgClass} />
        </div>
      </div>
    ),
  },
  {
    title: "Aug–Sep 2024",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Internship @ KreativeStorm — built an e-commerce store and a browser
          jumping game in a team using HTML, CSS & JS.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src={EcommerceImg} alt="E-commerce app" className={imgClass} />
          <img src={JumpingImg} alt="Jumping game" className={imgClass} />
        </div>
      </div>
    ),
  },
  {
    title: "Late 2024",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Completed the Meta Frontend Developer Professional Certificate on
          Coursera — covering React, Advanced React, UX/UI Design, JavaScript,
          and HTML/CSS.
        </p>
        <div className="flex items-center gap-4 rounded-xl border border-brand-cta/20 bg-brand-surface p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-cta/10">
            <ShieldCheck className="text-brand-cta" size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text">
              Meta Frontend Developer
            </p>
            <p className="text-xs text-brand-muted">
              Professional Certificate · Coursera · 2024
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Freelance frontend developer — delivered 5+ production-ready projects
          to clients including dashboards, API-integrated apps, and full-stack
          CMS/CRM features.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src={TrackifyImg} alt="Trackify" className={imgClass} />
          <img src={WatchlyImg} alt="Watchly" className={imgClass} />
        </div>
      </div>
    ),
  },
  {
    title: "Oct 2025 – Now",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          UI/UX & Frontend Developer @ Nabdh-Alibtikar — designed and built the
          company website, implemented CMS & CRM with Supabase and Next.js,
          responsible for tech infrastructure and ongoing performance.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src={NabdhImg} alt="Nabdh website" className={imgClass} />
          <img
            src={NabdhServiceImg}
            alt="Nabdh services section"
            className={imgClass}
          />
          <img
            src={NabdhProjectsImg}
            alt="Nabdh projects page"
            className={`col-span-2 ${imgClass}`}
          />
        </div>
      </div>
    ),
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <Timeline data={data} />
    </section>
  );
}
