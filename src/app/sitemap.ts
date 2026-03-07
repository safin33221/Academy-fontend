import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://nexaali.academy",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://nexaali.academy/course",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://nexaali.academy/join-us",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
    ];
}