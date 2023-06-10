import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-05-30",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
