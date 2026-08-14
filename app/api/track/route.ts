import { getPostBySlug } from "@/lib/blog";
import { getCaseStudyBySlug } from "@/lib/caseStudy";
import { getProjectBySlug } from "@/lib/project";
import { after, NextRequest, NextResponse } from "next/server";

export const CMS_API_URL = (
  process.env.CMS_API_URL ?? "https://cms.kibria.dev"
).replace(/\/+$/, "");

type TrackInput = {
  pageType:
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
  slug?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as TrackInput;

  if (!body.pageType) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing pageType in request body",
      },
      { status: 400 },
    );
  }

  // Capture request data before after()
  const forwarded = request.headers.get("x-forwarded-for");

  const ip =
    forwarded?.split(",")[0].trim() ?? request.headers.get("x-real-ip");

  console.log("IP DEBUG", {
    xForwardedFor: request.headers.get("x-forwarded-for"),
    xRealIp: request.headers.get("x-real-ip"),
  });

  const userAgent = request.headers.get("user-agent");

  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry");

  const city = request.headers.get("x-vercel-ip-city");
  const region = request.headers.get("x-vercel-ip-country-region");

  const location =
    country || city || region
      ? [city, region, country].filter(Boolean).join(", ")
      : null;

  const referer = request.headers.get("referer");

  after(async () => {
    try {
      const data: {
        pageType?: string | null;
        blogId?: string;
        projectId?: string;
        caseStudyId?: string;
      } = {
        pageType: body.pageType,
      };

      if (body.pageType === "BLOGS" && body.slug) {
        const post = await getPostBySlug(body.slug);

        if (post?.id) {
          data.blogId = post.id;
          data.pageType = null;
        }
      }

      if (body.pageType === "PROJECTS" && body.slug) {
        const project = await getProjectBySlug(body.slug);

        if (project?.id) {
          data.projectId = project.id;
          data.pageType = null;
        }
      }

      if (body.pageType === "CASE_STUDIES" && body.slug) {
        const caseStudy = await getCaseStudyBySlug(body.slug);

        if (caseStudy?.id) {
          data.caseStudyId = caseStudy.id;
          data.pageType = null;
        }
      }

      await fetch(`${CMS_API_URL}/api/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ip,
          location,
          userAgent,
          referer,
        }),
      });
    } catch (error) {
      console.error("Tracking error:", error);
    }
  });

  return NextResponse.json({
    success: true,
  });
}
