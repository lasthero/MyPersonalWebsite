import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { getResumeUrl, getResumeDataFromPdf } from "@/lib/s3";
import TerminalResume from "@/components/terminalResume";

const EVENTS_QUERY = `*[_type == "myBio"]{content}`;

export default async function IndexPage() {
  const [myBio, resumeUrl, resumeData] = await Promise.all([
    sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY }),
    getResumeUrl(),
    getResumeDataFromPdf(),
  ]);

  const bioLines: string[] = myBio[0].content
  .flatMap((block: any) =>
    block.children
      .map((child: any) => child.text)
      .filter((text: string) => text?.trim().length > 0)
  );

  return (
    <article>
      <TerminalResume resumeUrl={resumeUrl} data={resumeData} bio={bioLines} />
    </article>
  );
}