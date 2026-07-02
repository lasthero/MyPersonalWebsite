// src/app/studio/[[...tool]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  console.log('project id:', process.env.SANITY_PROJECT_ID);
  return <NextStudio config={config} />;
}