"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type PageType =
  | "HOME"
  | "ABOUT"
  | "SKILLS"
  | "SERVICES"
  | "CONTACT"
  | "TESTIMONIALS"
  | "BLOGS"
  | "PROJECTS"
  | "CASE_STUDIES"
  | "PRIVACY_POLICY"
  | "TERMS_OF_SERVICE";

type TrackData = {
  pageType: PageType;
  slug?: string;
};

function getTrackData(pathname: string): TrackData | null {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return {
      pageType: "HOME",
    };
  }

  const [section, slug] = segments;

  switch (section) {
    case "about":
      return {
        pageType: "ABOUT",
      };

    case "skills":
      return {
        pageType: "SKILLS",
      };

    case "services":
      return {
        pageType: "SERVICES",
      };

    case "contact":
      return {
        pageType: "CONTACT",
      };

    case "testimonials":
      return {
        pageType: "TESTIMONIALS",
      };

    case "blogs":
      return {
        pageType: "BLOGS",
        ...(slug && { slug }),
      };

    case "projects":
      return {
        pageType: "PROJECTS",
        ...(slug && { slug }),
      };

    case "case-studies":
      return {
        pageType: "CASE_STUDIES",
        ...(slug && { slug }),
      };

    case "privacy-policy":
      return {
        pageType: "PRIVACY_POLICY",
      };

    case "terms-of-service":
      return {
        pageType: "TERMS_OF_SERVICE",
      };

    default:
      return null;
  }
}

export default function TrackView() {
  const pathname = usePathname();

  useEffect(() => {
    const trackData = getTrackData(pathname);

    if (!trackData) return;
    
    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackData),
    }).catch((error) => {
      console.error("Tracking failed:", error);
    });
  }, [pathname]);

  return null;
}