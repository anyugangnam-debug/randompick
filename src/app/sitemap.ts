import { MetadataRoute } from "next";

const BASE_URL = "https://anyugangnam-debug.github.io/randompick";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/roulette/`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/random-picker/`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/team-generator/`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/punishment-picker/`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/number-picker/`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
