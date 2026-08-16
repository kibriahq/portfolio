import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/project";
import { getAllCaseStudies } from "@/lib/caseStudy";

const BASE_URL = "https://kibria.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, projects, caseStudies] = await Promise.all([
        getAllPosts().catch(() => []),
        getAllProjects().catch(() => []),
        getAllCaseStudies().catch(() => []),
    ]);

    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
        url: `${BASE_URL}/case-studies/${study.slug}`,
        lastModified: new Date(study.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const listingEntries: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/case-studies`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
    ];

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...listingEntries,
        ...blogEntries,
        ...projectEntries,
        ...caseStudyEntries,
    ];
}